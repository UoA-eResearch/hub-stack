import { AuthenticationError } from "apollo-server-errors";
import { Request } from "express";
import { 
    ASTNode, 
    GraphQLSchema,
    visit,
    TypeInfo,
    visitWithTypeInfo,
    execute,
    ExecutionArgs,
    print,
   } from "graphql";
import { visitResult } from "graphql-tools";
  
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

function getFieldsByType(schema: GraphQLSchema, document: ASTNode) {
  const fieldsByType: Record<string, string[]> = {};
  const typeInfo = new TypeInfo(schema);
  visit(document, visitWithTypeInfo(typeInfo, {
      Field(node) {
        const parentType = typeInfo.getParentType()?.name;
        if (!parentType) return;
        if (!fieldsByType[parentType]) {
          fieldsByType[parentType] = [];
        }
        fieldsByType[parentType].push(node.name.value);
      }
  }));
  return fieldsByType;
}

const findVerificationRequiredFields = (fieldsByType: Record<string, string[]>, protectedTypes: string[]) => {
  const typesRequiringVerification = Object.keys(fieldsByType).filter(typeName => {
    const typeIsCollection = typeName.includes("Collection");
    const upperCaseName = typeName[0].toLowerCase() + typeName.substring(1);
    if (!protectedTypes.includes(upperCaseName)) {
      // This type isn't protected, no need to verify its fields.
      return false;
    }
    const protectedFields = fieldsByType[typeName].filter(field =>
      !ALWAYS_PUBLIC_FIELDS.has(field) &&
      !(typeIsCollection && field === "items")
    );
    if (protectedFields.length > 0) {
      // Log any non-public fields the user is requesting
      console.log(`Marking type ${typeName} as requiring verification, because of requested field(s): ${protectedFields}`)
    }
    return protectedFields.length > 0;
  });

  console.log("Finished visiting.");
  return typesRequiringVerification;
};

function assertTypesHaveSsoField(fieldsByType: Record<string, string[]>, verificationRequiredTypes: string[]) {
  const eachTypeHasSsoField = verificationRequiredTypes.every(typeName => 
    fieldsByType[typeName].some(f => f === "ssoProtected")
  );
  if (!eachTypeHasSsoField) {
    throw new AuthenticationError('The ssoProtected field is required to query this content.');
  }
  return;
}

function  executeUnauthenticatedQuery(args: ExecutionArgs, protectedTypes: string[]) {
  const fieldsByType = getFieldsByType(args.schema, args.document);
  const verificationRequiredTypes = findVerificationRequiredFields(fieldsByType, protectedTypes);
  /**
   * Check whether they have included the ssoProtected field. If they haven't throw an auth error. 
   */
  assertTypesHaveSsoField(fieldsByType, verificationRequiredTypes);
  /**
   * Execute the query. If they have request non-public fields and isn't logged in, the
   * response is then intercepted and only returned if none of the results have an 'ssoProtected: true'
   * field. This is done in the visitResult function.
   */
  return Promise.resolve(execute(args)).then(result => {
    if (verificationRequiredTypes.length > 0) {
      /*
        Create an object shaped like 
        const verificationVisitor = {typeName: 
          {ssoProtected: Function},
         ...}
      */
      const verificationVisitor = Object.fromEntries(
        verificationRequiredTypes.map(typeName => [
          typeName,
          {
            ssoProtected(isSsoProtected: boolean) {
              if (isSsoProtected) {
                throw new AuthenticationError("Authentication required to view protected content from " + typeName);
              }
              return isSsoProtected;
            }
          }
        ])
      )
      visitResult(result, {
        document: args.document,
        variables: args.variableValues || {}
      }, args.schema, verificationVisitor);
    }
    return result;
  })
}

export default function executeAndVerify(args: ExecutionArgs, protectedTypes: string[]) {
  const context = args.contextValue as Request;

  if (args.operationName != 'IntrospectionQuery')
    console.log(`User: ${context.user ? context.user.username.split('_')[1] : 'Unauthenticated'}`)

  // Log incoming queries
  console.log('\n===== Query Recieved: ======\n', print(args.document));

  if (!context.user && args.operationName !== "IntrospectionQuery") {
    return executeUnauthenticatedQuery(args, protectedTypes)
  } else {
    // If authenticated, simply execute the query without verification.
    return Promise.resolve(execute(args));
  }
  
}
