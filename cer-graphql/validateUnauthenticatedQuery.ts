import { AuthenticationError } from "apollo-server-errors";
import { ASTNode, FieldNode, FragmentDefinitionNode, FragmentSpreadNode, visit, visitInParallel } from "graphql";

type FragmentFieldPathInfo = {
    name: string,
    path: FieldPath
};

type FieldNodeInfo = {
    field: FieldNode,
    path: FieldPath,
    ancestors: any[]
};

type FragmentNodeInfo = {
    node: FragmentSpreadNode,
    path: FieldPath,
    ancestors: readonly any[]
};

type FieldPath = readonly (string | number)[];

// const assertNoAliasingSsoProtectedVisitor = {
//     Field(node: FieldNode) {
//         const name = node.name.value;
//         const hasAlias = node.alias;
//         if (name === "ssoProtected" && hasAlias) {
//             throw new AuthenticationError("Validation: Aliasing the ssoProtected field is forbidden.");
//         }
//     }
// };

// function hasSameParent(path: FieldPath, another: FieldPath) {
//     return path.slice(0, path.length -1).every((p, idx) => (
//         p === another[idx]
//     ));
// }

/**
 * Given a query document, return the list of fields used in it and the paths they appear in.
 * @param document GraphQL AST document for the query
 * @returns An object of paths which a field appears in, keyed by field name.
 */
function getPathsByField(document: ASTNode): Record<string, FieldPath[]> {
    // Field paths, keyed by field name
    const pathsByField: Record<string, FieldPath[]> = {};
    // Fragment spread paths, keyed by fragment name
    const fragmentSpreads: Record<string, FragmentNodeInfo[]> = {};
    // Fields in fragments, and their paths, keyed by fragment name.
    const fieldsInFragment: Record<string, FragmentFieldPathInfo[]> = {};

    // First, we collect all the fields and their paths in the query.
    // If there are fragments, we collect the fields separately, because
    // they can appear in different places depending on fragment spread.
    // We also run the no aliasing checking visitor here for efficiency's sake.
    visit(document, {
        FragmentSpread(node, key, parent, path, ancestors) {
            const fragmentName = node.name.value;
            if (!fragmentSpreads[fragmentName]) {
                fragmentSpreads[fragmentName] = [];
            }
            fragmentSpreads[fragmentName].push({
                node, path, ancestors
            });
        },
        Field(node, key, parent, path, ancestors) {
            const name = node.name.value;
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
                // Remove the first selectionSet as this is duplicate when
                // we consider it being used in a spread.
                const spreadPath = path.slice(path.indexOf("selections") + 1, path.length - 1);
                fieldsInFragment[fragmentName].push({
                    name,
                    path: spreadPath
                });
            } else {
                // If it's just a field, we add it to the main
                // main pathsByField object.
                if (!pathsByField[name]) {
                    pathsByField[name] = [];
                }
                pathsByField[name].push(path);
            }
        }
    });

    // Next, add the paths of fragment spreads
    // to the paths of fragment fields, and put them in pathsByField.
    Object.keys(fieldsInFragment).forEach(fragment => {
        fieldsInFragment[fragment].forEach(field => {
            const depths = fragmentSpreads[fragment].map(
                fragmentDepth => fragmentDepth.concat(field.path));
            if (!pathsByField[field.name]) {
                pathsByField[field.name] = [];
            }
            pathsByField[field.name] = pathsByField[field.name].concat(depths);
        });
    });

    // Return the complete pathsByField object.
    return pathsByField;
}

function assertNoDeepProtectedFields(pathsByField: Record<string, FieldPath[]>){

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
export default function validateUnauthenticatedQuery(document: ASTNode): boolean {
    const pathsByField = getPathsByField(document);

}