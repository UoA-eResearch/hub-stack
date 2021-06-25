import { AuthenticationError } from "apollo-server-errors";


function assertResultsArePublicItems(result: any) {
    if (result.items && Array.isArray(result.items)) {
        const isEveryItemPublic = (result.items as any[]).every(item => !item?.ssoProtected);
        console.log("Is every result item public?", isEveryItemPublic);
        if (!isEveryItemPublic) {
            throw new AuthenticationError("Authentication required to view protected content.");
        }
    }
}

export default assertResultsArePublicItems;