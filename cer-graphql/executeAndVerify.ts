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
    FieldNode,
    GraphQLError,
    Kind,
    FragmentSpreadNode,
    FragmentDefinitionNode,
   } from "graphql";
import { correctASTNodes, visitResult } from "graphql-tools";
  
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

/**
 * Given a GraphQL query document, return all the fields the query asked for, keyed by
 * the type they belong to.
 * @param schema The schema to look up definitions in
 * @param document The query document
 * @returns A Record/object with the type names as keys, and array of field names the query asked for as values.
 */
function getFieldsByType(schema: GraphQLSchema, document: ASTNode) {
  const fieldsByType: Record<string, string[]> = {};
  const typeInfo = new TypeInfo(schema);
  visit(document, visitWithTypeInfo(typeInfo, {
      Field(node, key, parent, path, ancestors) {
        console.log(path);
        
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

type FragmentFieldDepthInfo = {
  depth: number,
  name: string
};

/**
 * 
 * @param document The query document
 * @param maxDepth number of nested selectionsets a protected field can be in.
 */
export function assertNoDeepProtectedFields(document: ASTNode, maxDepth = 3) {
  // Field depths, keyed by field name
  const depthByField: Record<string, number[]> = {};
  // How deep do fragment spreads occur, keyed by fragment name
  const fragmentSpreads: Record<string, number[]> = {};
  // Which fields are in fragments and how deep are they in the fragment, keyed by fragment name.
  const fieldsInFragment: Record<string, FragmentFieldDepthInfo[]> = {};

  // Traverse the query to figure out how deep fields are.
  visit(document, {
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
      console.log("Visiting field ", key);
      const name = node.name.value;
      const nestedSelectionSets = ancestors.filter(a => (
        "kind" in a ? a.kind === "SelectionSet" : false
      ));

      const fragmentDefs = ancestors.filter(a => (
        "kind" in a ? a.kind === "FragmentDefinition" : false
      )) as FragmentDefinitionNode[];

      if (fragmentDefs.length > 0) {
        // If this is inside a fragment,
        // we put it aside in the fieldsInFragment
        // field so we can sum it up with fragment spread
        // depth later.
        const fragmentName = fragmentDefs[0].name.value;
        if (!fieldsInFragment[fragmentName]) {
          fieldsInFragment[fragmentName] = [];
        }
        fieldsInFragment[fragmentName].push({
          name,
          depth: nestedSelectionSets.length
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
  });

  // Next, sum the depths of fields in fragments
  // and put them in depthByField
  Object.keys(fieldsInFragment).forEach(fragment => {
    fieldsInFragment[fragment].forEach(field => {
      const depths = fragmentSpreads[fragment].map(fragmentDepth => fragmentDepth + field.depth - 1);
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

const findVerificationRequiredFields = (fieldsByType: Record<string, string[]>, protectedTypes: string[]) => {
  const typesRequiringVerification = Object.keys(fieldsByType).filter(typeName => {
    const typeIsCollection = typeName.endsWith("Collection");
    const upperCaseName = typeName[0].toLowerCase() + typeName.substring(1);
    if (!protectedTypes.includes(upperCaseName)) {
      // This type isn't protected, no need to verify its fields.
      return false;
    }
    // Protected fields are fields that:
    // 1. aren't in the ALWAYS_PUBLIC_FIELDS set,
    // 2. isn't a Contentful "items" field for collection items,
    // 3. isn't a collection field itself.
    const protectedFields = fieldsByType[typeName].filter(field =>
      !ALWAYS_PUBLIC_FIELDS.has(field) &&
      !(typeIsCollection && field === "items") &&
      !field.endsWith("Collection")
    );
    if (protectedFields.length > 0) {
      // Log any non-public fields the user is requesting
      console.log(`Type ${typeName} requires verification, because of requested non-public field(s): ${protectedFields}`)
    }
    return protectedFields.length > 0;
  });
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

async function executeUnauthenticatedQuery(args: ExecutionArgs, protectedTypes: string[]) {
  const fieldsByType = getFieldsByType(args.schema, args.document);
  const verificationRequiredTypes = findVerificationRequiredFields(fieldsByType, protectedTypes);
  /**
   * Check whether they have included the ssoProtected field. If they haven't throw an auth error. 
   */
  assertNoDeepProtectedFields(args.document);
  assertTypesHaveSsoField(fieldsByType, verificationRequiredTypes);
  assertNoAliasingSsoProtected(args.document);
  /**
   * Execute the query. If they have request non-public fields and isn't logged in, the
   * response is then intercepted and only returned if none of the results have an 'ssoProtected: true'
   * field. This is done in the visitResult function.
   */
  const result = await Promise.resolve(execute(args));
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
            console.log("My arguments are ", arguments);
            if (isSsoProtected) {
              throw new AuthenticationError("Authentication required to view protected content from " + typeName);
            }
            return isSsoProtected;
          }
        }
      ])
    );
    visitResult(result, {
      document: args.document,
      variables: args.variableValues || {}
    }, args.schema, verificationVisitor);
  }
  return result;
}

export default function executeAndVerify(args: ExecutionArgs, protectedTypes: string[]) {
  // express-graphql passes in the express Request as context value by default.
  const context = args.contextValue as Request;

  if (args.operationName !== 'IntrospectionQuery') {
    console.log(`User: ${context.user ? context.user.username.split('_')[1] : 'Unauthenticated'}`)
    // Log incoming queries
    console.log('\n===== Query Recieved: ======\n', print(args.document));
  }

  if (!context.user && args.operationName !== "IntrospectionQuery") {
    return executeUnauthenticatedQuery(args, protectedTypes)
    // return Promise.resolve(execute(args));
  } else {
    // If authenticated, simply execute the query without verification.
    return Promise.resolve(execute(args));
  }
  
}
