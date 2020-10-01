const { gql } = require('apollo-server')

// List of fields that do not require SSO for different types
const ALWAYS_PUBLIC_FIELDS = [
    'title',
    'summary',
    'ssoProtected',
    'name'
]

// Fields that will be for searching
exports.SEARCHABLE_FIELDS = SEARCHABLE_FIELDS = ['title', 'summary', 'ssoProtected'];

exports.GET_ARTICLE_COLLECTION = gql`
{ 
    articleCollection {
        items {
            ${SEARCHABLE_FIELDS}
        }
    }
}
`;

exports.GET_ARTICLE_COLLECTION_PRIVATE = gql`
{ 
    articleCollection {
        items {
            body {
                json
            }
        }
    }
}
`;

exports.GET_SUBHUB_COLLECTION = gql`
{ 
    subHubCollection {
        items {
            ${SEARCHABLE_FIELDS}
        }
    }
}
`;

exports.GET_EQUIPMENT_COLLECTION = gql`
{ 
    equipmentCollection {
        items {
            ${SEARCHABLE_FIELDS}
        }
    }
}
`;

exports.GET_ARTICLE_BY_SYS_ID = gql`
    query ($id: String!) { 
        article(id: $id) {
            title 
            ssoProtected
        }
    }
`;

exports.GET_ARTICLE_BY_SYS_ID_PRIVATE = gql`
    query ($id: String!) { 
        article(id: $id) {
            body {
                json
            } 
        }
    }
`;

exports.GET_ARTICLE_BY_WHERE = gql`
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