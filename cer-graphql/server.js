const { introspectSchema, wrapSchema, mergeSchemas, delegateToSchema, visitResult } = require('graphql-tools');
const { print, Kind, visit, TypeInfo, visitWithTypeInfo, execute } =require("graphql");
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const fetch = require("node-fetch");


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

// Fetch remote schema.
const executor = async ({ document, variables }) => {
  const query = print(document);
  const fetchResult = await fetch(`https://graphql.contentful.com/content/v1/spaces`, {
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
  let protectedTypes = Object.keys(contentfulSchema._typeMap)
      .filter(x => x.includes('Filter')) // Get all the filters
      .filter(x => !x.startsWith('cf')) // Filter out Contentful's special cf* filters
      .filter(y => contentfulSchema._typeMap[y]._fields.ssoProtected) // Filter by those with an ssoProtected field
      .flatMap(z => [z.replace('Filter', ''), z.replace('Filter', 'Collection')]) // Replace 'xfilter' with 'x' and 'xCollection'
      .map(a => a[0].toLowerCase() + a.substring(1)); // Make first char lower case

  const findVerificationRequiredFields = (schema, document) => {
    const typesRequiringVerification = [];
    const typeInfo = new TypeInfo(schema);
    visit(document, visitWithTypeInfo(typeInfo, {
      enter: {
        Field(node) {
          const parentType = typeInfo.getParentType().name;
          const parentIsCollection = parentType.includes("Collection");
          if (protectedTypes.includes(parentType[0].toLowerCase() + parentType.substring(1)) 
          && !ALWAYS_PUBLIC_FIELDS.has(node.name.value)
          && !(parentIsCollection && node.name.value === "items")) {
            console.log("Marking type", parentType, "as requiring verification, because of value", node.name.value);
            typesRequiringVerification.push(parentType);
          }
        }
      }
    }));
    console.log("Finished visiting.");
    return typesRequiringVerification;
  };

  const customQueryResolvers = Object.fromEntries(protectedTypes.map(
    type => [type, (root, args, context, info) => {
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

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
      // validationRules: [PrintAllFields],
      context: {
        user: "noel"
      },
      customExecuteFn: (args) => {  
        const verificationRequiredFields = findVerificationRequiredFields(args.schema, args.document, args.contextValue);
        return Promise.resolve(execute(args)).then(result => {
          if (verificationRequiredFields.length > 0) {
            const verificationVisitor = Object.fromEntries(
              verificationRequiredFields.map(fieldName => [
                fieldName,
                {
                  ssoProtected (isSsoProtected) {
                    if (isSsoProtected) {
                      throw new Error("Oh no, auth required for", fieldName);
                    }
                    return isSsoProtected;
                  }
                }
              ])
            )
            visitResult(result, {
              document: args.document,
              variables: args.variableValues
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