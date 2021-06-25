import { Request } from "express";
import { 
    execute,
    ExecutionArgs,
    print,
   } from "graphql";
import { AuthenticationError } from "apollo-server-errors";
import { ASTNode, FieldNode, FragmentDefinitionNode, GraphQLSchema, TypeInfo, visit, visitWithTypeInfo } from "graphql";

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
  
type FragmentFieldDepthInfo = {
    depth: number,
    name: string
  };

/**
 * Given a query document, check that it doesn't ask for protected, nested fields on protected types.
 * @param document The query document
 * @param maxDepth number of nested selectionsets a protected field can be in.
 * @throws AuthenticationError if there are any protected nested fields.
 */
function assertNoDeepProtectedFields(document: ASTNode, schema: GraphQLSchema, protectedTypes: Set<string>, maxDepth = 3) {
    // Field depths, keyed by field name
    const depthByField: Record<string, number[]> = {};
    // How deep do fragment spreads occur, keyed by fragment name
    const fragmentSpreads: Record<string, number[]> = {};
    // Which fields are in fragments and how deep are they in the fragment, keyed by fragment name.
    const fieldsInFragment: Record<string, FragmentFieldDepthInfo[]> = {};

    const typeInfo = new TypeInfo(schema);

    // First, we collect all the fields and their paths in the query.
    // If there are fragments, we collect the fields separately, because
    // they can appear in different places depending on fragment spread.
    // We also run the no aliasing checking visitor here for efficiency's sake.
    visit(document, visitWithTypeInfo(typeInfo, {
        FragmentSpread(node, key, parent, path, ancestors) {
            const fragmentName = node.name.value;
            const nestedLevel = ancestors.filter(a => (
                "kind" in a ? a.kind === "SelectionSet" : false
            ));
            if (!fragmentSpreads[fragmentName]) {
                fragmentSpreads[fragmentName] = [];
            }
            fragmentSpreads[fragmentName].push(nestedLevel.length);
        },
        Field(node, key, parent, path, ancestors) {
            const parentType = typeInfo.getParentType()?.name || "";
            const upperCaseParentType = parentType[0].toLowerCase() + parentType.substring(1);
            const name = node.name.value;
            if (!protectedTypes.has(upperCaseParentType)) {
                // If this doesn't belong to one of the protected types, skip recording the field.
                return;
            }
            const nestedSelectionSets = ancestors.filter(a => (
                "kind" in a ? a.kind === "SelectionSet" : false
            ));

            const fragmentDefs = ancestors.filter(a => (
                "kind" in a ? a.kind === "FragmentDefinition" : false
            )) as FragmentDefinitionNode[];

            if (fragmentDefs.length > 0) {
                // This field is inside a fragment.
                // We put it aside in the fieldsInFragment
                // field so we can sum it up with fragment spread
                // path later.
                const fragmentName = fragmentDefs[0].name.value;
                if (!fieldsInFragment[fragmentName]) {
                    fieldsInFragment[fragmentName] = [];
                }
                // Reduce depth by 1 as this is duplicate when
                // we consider it being used in a spread.
                fieldsInFragment[fragmentName].push({
                    name,
                    depth: nestedSelectionSets.length - 1
                });
            } else {
                // If it's just a field, we add it to the main
                // main depthByField object.
                if (!depthByField[name]) {
                    depthByField[name] = [];
                }
                depthByField[name].push(nestedSelectionSets.length);
            }
        }
    }));

    // Next, sum the depths of fields in fragments
    // and put them in depthByField
    Object.keys(fieldsInFragment).forEach(fragment => {
        fieldsInFragment[fragment].forEach(field => {
            const depths = fragmentSpreads[fragment].map(fragmentDepth => fragmentDepth + field.depth);
            if (!depthByField[field.name]) {
                depthByField[field.name] = [];
            }
            depthByField[field.name] = depthByField[field.name].concat(depths);
        });
    });

    const protectedFields = Object.keys(depthByField).filter(field => (
        // Find fields which are protected.
        !ALWAYS_PUBLIC_FIELDS.has(field))
    );

    protectedFields.forEach(fieldName => {
        if (depthByField[fieldName].some(depth => depth > maxDepth)) {
            throw new AuthenticationError("Validation: Query should not ask for nested fields that are protected.");
        }

    });
}

function assertNoAliasingSsoProtected(document: ASTNode) {
    visit(document, {
      Field(node: FieldNode) {
        const name = node.name.value;
        const hasAlias = node.alias;
        if (name === "ssoProtected" && hasAlias) {
            throw new AuthenticationError("Validation: Aliasing the ssoProtected field is forbidden.");
        }
      }
    });
  }

type TypeInstance = {
    type: string,
    fields: string[]
};

/**
 * Given a query document, check if 1- whether it asks for protected fields, and 2- whether 
 * ssoProtected field is used whenever protected fields are asked for.
 * @param document Query document
 * @param schema GraphQLScheme
 * @param protectedTypes Names of types which are considered protected, as a Set.
 * @returns True if there are protected fields, false if not.
 * @throws AuthenticationError if protected fields are requested without ssoProtected.
 */
function assertProtectedTypeHasSsoField(document: ASTNode, schema: GraphQLSchema, protectedTypes: Set<string>) {
    const fieldsByPath: Record<string, TypeInstance> = {};
    const typeInfo = new TypeInfo(schema);
    // First, find fields and group them by their type and path. 
    visit(document, visitWithTypeInfo(typeInfo, {
        Field(node, key, parent, path, ancestors) {
            const name = node.name.value;
            const parentType = typeInfo.getParentType()?.name || "";
            const upperCaseParentType = parentType[0].toLowerCase() + parentType.substring(1);
            if (!protectedTypes.has(upperCaseParentType)) {
                // If this doesn't belong to one of the protected types, skip recording the field.
                return;
            }
            const parentPathKey = path.slice(0, path.length - 1).join(".");
            if (!fieldsByPath[parentPathKey]) {
                fieldsByPath[parentPathKey] = { type: upperCaseParentType , fields: []};
            }
            fieldsByPath[parentPathKey].fields.push(name);
        }
    }));

    const typeInstancesVerificationStatus = Object.keys(fieldsByPath).map(path => {
        const typeInstance = fieldsByPath[path];
        const typeIsCollection = typeInstance.type.endsWith("Collection");
        const protectedFields = typeInstance.fields.filter(field => 
            !ALWAYS_PUBLIC_FIELDS.has(field) &&
            !(typeIsCollection && field === "items") &&
            !field.endsWith("Collection")
        );
        if (protectedFields.length > 0) {
            // Log any non-public fields the user is requesting
            console.log(`Type ${typeInstance.type} requires verification, because of requested non-public field(s): ${protectedFields}`);
            if (!typeInstance.fields.some(f => f === "ssoProtected")) {
                // Check if the type instance has ssoProtected field.
                throw new AuthenticationError('The ssoProtected field is required to query this content.');
            }
        }
        return protectedFields.length > 0;
    });
    // Returns verification required if at least some of the types require verification.
    return typeInstancesVerificationStatus.some(status => status);
}
/**
 * Given a query, checks whether it conforms to conditions we have
 * for unauthenticated queries, and whether the results from this
 * query should be verified.
 * @param document GraphQL AST document for the query
 * @returns True if verifying results is required, false otherwise.
 * @throws AuthenticationError if the query exceeds what an unauthenticated
 * query should have. 
 */
function validateUnauthenticatedQuery(document: ASTNode, schema: GraphQLSchema, protectedTypes: Set<string>): boolean {
    assertNoDeepProtectedFields(document, schema, protectedTypes);
    assertNoAliasingSsoProtected(document);
    return assertProtectedTypeHasSsoField(document, schema, protectedTypes);
}


async function executeUnauthenticatedQuery(args: ExecutionArgs, protectedTypes: string[]) {
  const requiresVerification = validateUnauthenticatedQuery(args.document, args.schema, new Set(protectedTypes));
  const context = args.contextValue as Request;
  // Add this to context, so our protected type resolvers can know whether to check results or not.
  context.resRequiresVerification = requiresVerification;
  return await Promise.resolve(execute(args));
}

/**
 * A custom execute function that differentiates between unauthenticated and
 * authenticated queries.
 * @param args ExecutionArgs as part of the execution context
 * @param protectedTypes A list of protected types
 * @returns A promise of the result of execution
 */
export default function executeQuery(args: ExecutionArgs, protectedTypes: string[]) {
  // express-graphql passes in the express Request (which we've customised, see authenticateByJwt.ts) 
  // as context value by default.
  const context = args.contextValue as Request;

  if (args.operationName !== 'IntrospectionQuery') {
    console.log(`User: ${context.user ? context.user.username.split('_')[1] : 'Unauthenticated'}`)
    // Log incoming queries
    console.log('\n===== Query Recieved: ======\n', print(args.document));
  }

  if (!context.user && args.operationName !== "IntrospectionQuery") {
    return executeUnauthenticatedQuery(args, protectedTypes);
  } else {
    // If authenticated, simply execute the query without verification.
    return Promise.resolve(execute(args));
  }
  
}
