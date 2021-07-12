import { AuthenticationError } from "apollo-server-errors";
/**
 * A validation function that does a shallow check on whether each item in results
 * is public. If not, throw an authenticationerror.  
 * @param result Result from delegating a GraphQL call.
 */
function assertResultsArePublicItems(result: Record<string, any>) {
    if (result.items && Array.isArray(result.items)) {
        const isEveryItemPublic = (result.items as any[]).every(item => !item?.ssoProtected);
        if (!isEveryItemPublic) {
            throw new AuthenticationError("Authentication required to view protected content.");
        }
    }
}

export default assertResultsArePublicItems;