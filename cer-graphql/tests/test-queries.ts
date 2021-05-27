// List of fields that do not require SSO for different types
const ALWAYS_PUBLIC_FIELDS = [
    'title',
    'summary',
    'ssoProtected',
    'name'
]

// Fields that will be for searching
export const SEARCHABLE_FIELDS = ['title', 'summary', 'ssoProtected'];

export const GET_ARTICLE_COLLECTION = `
{ 
    articleCollection {
        items {
            ${SEARCHABLE_FIELDS}
        }
    }
}
`;

export const GET_ARTICLE_COLLECTION_PRIVATE = `
{ 
    articleCollection {
        items {
            bodyText {
                json
            }
        }
    }
}
`;

export const GET_ARTICLE_COLLECTION_PRIVATE_WITH_SSO = `
query {
	articleCollection ( where:{
    AND:[
        { ssoProtected:true}
    ]
    })
    {
    items{
        title 
        ssoProtected
        owner {
        name
        }
    }
    }
}
`;

export const GET_SUBHUB_COLLECTION = `
{ 
    subHubCollection {
        items {
            ${SEARCHABLE_FIELDS}
        }
    }
}
`;

export const GET_EQUIPMENT_COLLECTION = `
{ 
    equipmentCollection {
        items {
            ${SEARCHABLE_FIELDS}
        }
    }
}
`;

export const GET_ARTICLE_BY_SYS_ID = `
    query ($id: String!) { 
        article(id: $id) {
            title 
            ssoProtected
        }
    }
`;

export const GET_ARTICLE_BY_SYS_ID_PRIVATE = `
    query ($id: String!) { 
        article(id: $id) {
            bodyText {
                json
            } 
        }
    }
`;

export const GET_ARTICLE_BY_WHERE = `
query ($title: String!) {
    articleCollection(where: {
        title: $title
    }){
        items {
            title
            summary
        }
    }
}
`;