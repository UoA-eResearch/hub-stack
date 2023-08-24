import {
  DocumentNode,
  GraphQLResolveInfo,
  GraphQLSchema
} from "graphql";
import fetch from "cross-fetch";
import { validateUnauthenticatedQuery } from "./validateUnauthenticatedQuery";
import authenticateByJwt, { fetchCognitoPublicKeys } from "./authenticateByJwt";
import assertResultsArePublicItems from "./assertResultsArePublicItems";
import { AuthenticationError, ApolloServer } from "apollo-server";
import { 
  mergeSchemas,
  makeRemoteExecutableSchema,
  delegateToSchema,
  introspectSchema,
} from "graphql-tools";
import { HttpLink } from "apollo-link-http";
import depthLimit from "graphql-depth-limit";
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageProductionDefault } from "apollo-server-core";

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
async function getRemoteSchema(remoteUri: string) {
  try {
      console.log('Loading remote schema...')
      const link = new HttpLink({ uri: remoteUri, fetch });
      const schema = await introspectSchema(link);

      console.log('Remote schema loaded successfully.')
      return makeRemoteExecutableSchema({
          schema,
          link,
      });
  } catch (e) {
    console.error(e);
    throw new Error("Unable to load remote schema.");
  }
}
/**
 * Given schema for Hub content, returns resolver names for
 * types that require authentication resolvers.
* @param schema GraphQL schema for Hub content
 * @returns Array of resolver names for types that should be protected.
 */
function getProtectedTypes(schema: GraphQLSchema) {
  const typeMap = schema.getTypeMap();
  return Object.keys(typeMap)
    .filter(typeName => { 
      const type = typeMap[typeName];
      // Filters don't need resolvers.
      if (typeName.includes("Filter")){
        return false;
      }
      // If the type is a primitive, then it doesn't need protection.
      if (!("getFields" in type)) {
        return false;
      } else {
        //  If a content type has a "contentfulMetadata" field,
        // it is a type defined by us and not a Contentful built-in type.
        // See https://www.contentful.com/developers/docs/references/graphql/#/reference/schema-generation/contentfulmetadata-field
        //  
        // We then check if it has a ssoProtected field, which we use
        // to flag authenticated content.
        const fields = type.getFields();
        return fields["contentfulMetadata"] && fields["ssoProtected"];
      }
    })
    // Make first char lower case for resolver convention.
    .map(a => a[0].toLowerCase() + a.substring(1)); 
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

  const cognitoPublicKeys = await fetchCognitoPublicKeys(cognitoPublicKeysUrl);

  // Get a list of the types that have the ssoProtected field
  const protectedTypes = getProtectedTypes(contentfulSchema);

  const customQueryResolvers = Object.fromEntries(protectedTypes.map(
    type => [type, (root: DocumentNode, args: any, context: any, info: GraphQLResolveInfo): Promise<any> | AuthenticationError => {
      if (IS_PREVIEW_ENV) {
        // Add preview as a query argument if we are in a preview
        // environment.
        args.preview = true;
      }
      const user = context.user;
      console.log(`User: ${user ? user.username.split('_')[1] : 'Unauthenticated'}`)
      let verificationRequired = false;
      const protectedTypesSet = new Set(protectedTypes);
      if (!user) {
        /**
         * If the user is not signed in and the responseVerificationRequired flag is
         * true (i.e. they requested potentially non-public info rmation), check the response
         * for the existence of any 'ssoProtected: true' fields.
         */
        verificationRequired = validateUnauthenticatedQuery(root, schema, protectedTypesSet);
      }

      return delegateToSchema({
        schema: contentfulSchema,
        operation: "query",
        fieldName: info.fieldName,
        args,
        context,
        info
      }).then(result => {
        if (verificationRequired) {
          assertResultsArePublicItems(result);
        }
        return result;
      });
    }]));

    customQueryResolvers['personCollection'] = (root, args, context, info) => {
      if (IS_PREVIEW_ENV) {
        // Add preview as a query argument if we are in a preview
        // environment.
        args.preview = true;
      }
      console.log(`User: ${context.user ? context.user.username.split('_')[1] : 'Unauthenticated'}`)
      if (context.user) { // If the user is signed in, simply forward request
        return delegateToSchema({
          schema: contentfulSchema,
          operation: "query",
          fieldName: info.fieldName,
          args,
          context,
          info
        });
      } else { // If the user is not signed in they shouldn't be allowed to request the personCollection
        return new AuthenticationError('You cannot query the personCollection unless authenticated.');
      }
    }

    const enablePlayground = CONTENTFUL_ENVIRONMENT_ID === 'dev' ? true : false;

    const schema = mergeSchemas({
      schemas: [contentfulSchema],
      resolvers: [{
        Query: customQueryResolvers
      }]
    });
    return new ApolloServer({
      schema,
      introspection: true,
      plugins: [
        // Since Apollo 3, the GraphQL Playground environment
        // is replaced by a link to Apollo Sandbox, a proprietary cloud-based
        // service. They have also provided an option to re-enable GraphQL Playground,
        // which is used here.
        // GraphQL Playground is being merged with graphiql, though
        // seems progress is stalled. (https://github.com/graphql/graphql-playground/issues/1143)
        // May need to migrate to graphiql when that is available.
        enablePlayground ?
        ApolloServerPluginLandingPageGraphQLPlayground() :
        ApolloServerPluginLandingPageProductionDefault()
      ]
      ,
      rootValue: (document: DocumentNode) => {
        // This sets the root value for each resolver to be the query document,
        // enabling us to have the whole query document in resolvers.
        return document;
      },
      // apply query validation rules
      validationRules: [
        depthLimit(
          7,
          { ignore: [] }
        ),
      ],
      context: ({req}) => {
          // Log incoming queries
          if (req && req.body && (req.body.operationName != 'IntrospectionQuery'))
              console.log('\n===== Query Recieved: ======\n', req.body.query)
          // Apply authentication.
          return authenticateByJwt(cognitoPublicKeys, req?.headers?.authorization, IS_PREVIEW_ENV);
      }, formatError: (err: any) => {
          // Print out errors so they can be searched in logs.
          console.error(err);
          return err;
        },
      
  });

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
  