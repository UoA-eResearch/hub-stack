import { 
  ASTNode, 
  GraphQLSchema,
  print,
  visit,
  TypeInfo,
  visitWithTypeInfo,
  execute
 } from "graphql";
import { 
  wrapSchema, 
  mergeSchemas, 
  delegateToSchema, 
  introspectSchema, 
  visitResult, 
  ExecutionParams,
  IResolvers
} from "graphql-tools";
import express, { Response, Request } from "express";
import { graphqlHTTP } from "express-graphql";
import fetch from "node-fetch";

/**
 * Deletes environment variables we expect to use as existing env vars dont get overwritten.
 */
 const deleteEnvironmentVariables = () => {
  delete process.env.CONTENTFUL_ACCESS_TOKEN;
  delete process.env.CONTENTFUL_SPACE_ID;
  delete process.env.COGNITO_USER_POOL; 
  delete process.env.COGNITO_REGION; 
}

/**
 * Conditionally loads environment variables from an environment file returns object with env values.
 * @param {boolean} isFromFile Whether or not to load the .env file
 * @returns void
 */
 const getCredentials = (isFromFile: boolean) => {
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


const GRAPHQL_INTROSPECTION_FIELDS = [
  '__Schema',
  '__Type',
  '__TypeKind',
  '__typename',
  '__Field',
  '__InputValue',
  '__EnumValue',
  '__Directive',
  'sys',
  'id',
];

// Check whether the user has requested only public fields
const ALWAYS_PUBLIC_FIELDS = new Set([
  'title',
  'maoriProverb',
  'summary',
  'name',
  'ssoProtected',
  'searchable',
  'linkedFrom',
  'slug',
  'banner',
  'icon',
  ...GRAPHQL_INTROSPECTION_FIELDS
]);

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

// Fetch remote schema.
const executor = async ({ document, variables }: ExecutionParams) => {
  const query = print(document);
  const fetchResult = await fetch(`https://graphql.contentful.com/content/v1/spaces/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables })
  });
  return fetchResult.json();
};
async function runServer () {
  const contentfulSchema = wrapSchema({
    schema: await introspectSchema(executor),
    executor
  });

  // Get a list of the types that have the ssoProtected field
  let protectedTypes = getProtectedTypes(contentfulSchema);

  const findVerificationRequiredFields = (schema: GraphQLSchema, document: ASTNode) => {
    const typesRequiringVerification: string[] = [];
    const typeInfo = new TypeInfo(schema);
    visit(document, visitWithTypeInfo(typeInfo, {
        Field(node) {
          const parentType = typeInfo.getParentType()?.name;
          if (!parentType) return;
          const parentIsCollection = parentType.includes("Collection");
          if (protectedTypes.includes(parentType[0].toLowerCase() + parentType.substring(1)) 
          && !ALWAYS_PUBLIC_FIELDS.has(node.name.value)
          && !(parentIsCollection && node.name.value === "items")) {
            // Query has asked for a non-public field in this type, so we mark its results as needing verification.
            console.log("Marking type", parentType, "as requiring verification, because of value", node.name.value);
            typesRequiringVerification.push(parentType);
          }
        }
    }));
    console.log("Finished visiting.");
    return typesRequiringVerification;
  };

  const customQueryResolvers : IResolvers = Object.fromEntries(protectedTypes.map(
    type => [type, (root, args, context, info)  => {
    console.log(`${type} resolver called.`);
    
    return delegateToSchema({
      schema: contentfulSchema,
      operation: "query",
      fieldName: info.fieldName,
      args,
      context,
      info    })
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

  app.use(
    '/',
    graphqlHTTP({
      schema,
      graphiql: true,
      // validationRules: [PrintAllFields],
      context: {
        user: "noel"
      },
      customExecuteFn: (args) => {  
        const verificationRequiredFields = findVerificationRequiredFields(args.schema, args.document);
        return Promise.resolve(execute(args)).then(result => {
          if (verificationRequiredFields.length > 0) {
            const verificationVisitor = Object.fromEntries(
              verificationRequiredFields.map(fieldName => [
                fieldName,
                {
                  ssoProtected (isSsoProtected : boolean) {
                    if (isSsoProtected) {
                      throw new Error("Oh no, auth required for " + fieldName);
                    }
                    return isSsoProtected;
                  }
                }
              ])
            )
            visitResult(result, {
              document: args.document,
              variables: args.variableValues || {}
            }, args.schema, verificationVisitor );
          }
          return result;
        })
      },
      customFormatErrorFn: (error) => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
      })
    }),
  );

  app.listen(4000);
};
runServer();