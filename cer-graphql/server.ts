import { 
  GraphQLSchema,
  print,
 } from "graphql";
import { 
  wrapSchema, 
  mergeSchemas, 
  delegateToSchema, 
  introspectSchema, 
  ExecutionParams,
  IResolvers
} from "graphql-tools";
import express, { Response, Request } from "express";
import { graphqlHTTP } from "express-graphql";
import fetch from "node-fetch";
import executeAndVerify from "./executeAndVerify";
import authenticateByJwt from "./authenticateByJwt";
import cors from "cors";

// Measure server startup time
var startTime = new Date().getTime(); 


/**
 * Deletes environment variables we expect to use as existing env vars dont get overwritten.
 */
 const deleteEnvironmentVariables = () => {
  delete process.env.CONTENTFUL_ACCESS_TOKEN;
  delete process.env.CONTENTFUL_SPACE_ID;
  delete process.env.COGNITO_USER_POOL; 
  delete process.env.COGNITO_REGION; 
}

export type CerGraphqlServerConfig = {
  CONTENTFUL_ACCESS_TOKEN: string | undefined,
  CONTENTFUL_ENVIRONMENT_ID: string | undefined,
  CONTENTFUL_SPACE_ID: string | undefined,
  COGNITO_USER_POOL: string | undefined,
  COGNITO_REGION: string | undefined,
  IS_PREVIEW_ENV: boolean
}

/**
 * Conditionally loads environment variables from an environment file returns object with env values.
 * @param {boolean} isFromFile Whether or not to load the .env file
 * @returns A config object with server parameters. CerGraphqlServerConfig
 */
export const getCredentials = (isFromFile: boolean): CerGraphqlServerConfig => {
  // isFromFile determines where we load the credentials from.
  // If true we load from the .env file in the folder. 
  // If false, we load from environment variables.
  if (isFromFile) {
      deleteEnvironmentVariables();
      let path;
      switch(process.env.stage) {
          case 'dev':
              path = '../.env';
              break;
          case 'test':
              path = '../.test.env';
              break;
          default:
              path = '../.env';
              break;
      }

      const configResult = require('dotenv').config({path});
      if (configResult.error) {
          throw configResult.error;
      }
  }
  let isPreviewEnv = false;
  if (process.env.IS_PREVIEW_ENV !== undefined) {
      isPreviewEnv = process.env.IS_PREVIEW_ENV === "true";
  }
  return {
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
      CONTENTFUL_ENVIRONMENT_ID: process.env.CONTENTFUL_ENVIRONMENT_ID,
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
      COGNITO_USER_POOL: process.env.COGNITO_USER_POOL,
      COGNITO_REGION: process.env.COGNITO_REGION,
      IS_PREVIEW_ENV: isPreviewEnv
  };
};

// Set up remote schemas
// Load a remote schema and set up the http-link
async function getRemoteSchema (remoteUri: string) {
  // Fetch remote schema.
  const executor = async ({ document, variables }: ExecutionParams) => {
    const query = print(document);
    const fetchResult = await fetch(remoteUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables })
    });
    return fetchResult.json();
  };
  console.log('Loading remote schema...')
  const schema = await introspectSchema(executor);
  console.log('Remote schema loaded successfully.')
  return wrapSchema({
    schema,
    executor
  });
}



function getProtectedTypes(schema: GraphQLSchema) {
  const typeMap = schema.getTypeMap();

  return Object.keys(typeMap)
      .filter(x => x.includes('Filter')) // Get all the filters
      .filter(x => !x.startsWith('cf')) // Filter out Contentful's special cf* filters
      .filter(y => { // Filter by those with an ssoProtected field
        const type = typeMap[y];
        // First check this type has its own nested fields, before seeing if it has a ssoProtected field.
        return "getFields" in type && type.getFields()["ssoProtected"]; 
      })
      .flatMap(z => [z.replace('Filter', ''), z.replace('Filter', 'Collection')]) // Replace 'xfilter' with 'x' and 'xCollection'
      .map(a => a[0].toLowerCase() + a.substring(1)); // Make first char lower case
}

export async function createServer (config: CerGraphqlServerConfig) {
  const { CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_ENVIRONMENT_ID,
    CONTENTFUL_SPACE_ID,
    COGNITO_REGION,
    COGNITO_USER_POOL,
    IS_PREVIEW_ENV
} = config;

  const contentfulSchema = await getRemoteSchema(`https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}` +
  `/environments/${CONTENTFUL_ENVIRONMENT_ID}?access_token=${CONTENTFUL_ACCESS_TOKEN}`);

  // Load Cognito public keys in order to verify tokens.
  const cognitoPublicKeysUrl = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL}` +
    "/.well-known/jwks.json";


  // Get a list of the types that have the ssoProtected field
  let protectedTypes = getProtectedTypes(contentfulSchema);

  const customQueryResolvers : IResolvers = Object.fromEntries(protectedTypes.map(
    type => [type, (root, args, context, info)  => {
      if (IS_PREVIEW_ENV) {
        // Add preview as a query argument if we are in a preview
        // environment.
        args.preview = true;
    }
    
    
    return delegateToSchema({
      schema: contentfulSchema,
      operation: "query",
      fieldName: info.fieldName,
      args,
      context,
      info    
    })
  }]));

  const schema = mergeSchemas({
    schemas: [contentfulSchema],
    resolvers: [{
      Query: customQueryResolvers
    }]
  });
  const app = express();

  // Health check endpoint. Maintain compatibility with the Apollo endpoint.
  app.get("/.well-known/apollo/server-health", (req : Request, res : Response) => res.send("OK"));
  
  // Enable CORS headers
  app.use(cors());
  
  app.use(
    await authenticateByJwt(cognitoPublicKeysUrl, IS_PREVIEW_ENV)
  );
  
  app.use(
    '/',
    graphqlHTTP({
      schema,
      graphiql: true,
      customFormatErrorFn: err => {
        console.error(err);
        return err;
      },
      // validationRules: [PrintAllFields],
      customExecuteFn: (args) => executeAndVerify(args, protectedTypes)
    })
  );

  return app;
};

// If the file is being called directly instead of being required as a module.
if (require.main === module) {
  (async () => {
    // Create the ApolloServer object
    const isConfigFromFile = process.argv.includes("--config-from-file")
    let config;
    try {
      config = getCredentials(isConfigFromFile);
    } catch (error) {
      console.error("Could not load credentials from file. Make sure you have filled in credentials in the .env file," +
        "or try running the server without --config-from-file.");
      process.exit(1);
    }
    if (config.IS_PREVIEW_ENV) {
      console.log("Running in preview environment, will request draft content from Contentful.");
    }
    // Check if access token and space ID are supplied.
    if (!config.CONTENTFUL_ACCESS_TOKEN || !config.CONTENTFUL_SPACE_ID ||
      !config.COGNITO_REGION || !config.COGNITO_USER_POOL || !config.CONTENTFUL_ENVIRONMENT_ID) {
      console.error("Contentful and/or Cognito values not supplied. Please set environment variables CONTENTFUL_ACCESS_TOKEN, " +
        "CONTENTFUL_SPACE_ID, CONTENTFUL_ENVIRONMENT_ID, COGNITO_REGION and COGNITO_USER_POOL.");
      process.exit(1);
    }

    try {
      let server = await createServer(config);

      // The 'listen' method launches a web server.
      server.listen(4000);
      console.log(`🚀  Content API server ready. Server started in: ${new Date().getTime() - startTime}ms.`);
    } catch(error) { console.log('Error creating server object and getting it to listen: ', error) }
  })();
}
