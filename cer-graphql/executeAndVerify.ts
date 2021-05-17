import { AuthenticationError } from "apollo-server-errors";
import { 
    ASTNode, 
    GraphQLSchema,
    visit,
    TypeInfo,
    visitWithTypeInfo,
    execute,
    ExecutionArgs
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


const findVerificationRequiredFields = (schema: GraphQLSchema, document: ASTNode, protectedTypes: string[]) => {
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

export default function executeAndVerify(args: ExecutionArgs, protectedTypes: string[]) {
    const verificationRequiredFields = findVerificationRequiredFields(args.schema, args.document, protectedTypes);

    return Promise.resolve(execute(args)).then(result => {
      if (verificationRequiredFields.length > 0) {
        const verificationVisitor = Object.fromEntries(
          verificationRequiredFields.map(fieldName => [
            fieldName,
            {
              ssoProtected (isSsoProtected : boolean) {
                if (isSsoProtected) {
                  throw new AuthenticationError("Oh no, auth required for " + fieldName);
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
}