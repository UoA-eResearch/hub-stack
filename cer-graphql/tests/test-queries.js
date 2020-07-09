const { gql } = require('apollo-server')

// List of fields that do not require SSO for different types
const ALWAYS_PUBLIC_FIELDS = [
    'title',
    'summary',
    'ssoProtected',
    'name'
]

// Fields that will be for searching
const SEARCHABLE_FIELDS = ['title', 'summary', 'ssoProtected'];

exports.GET_ARTICLE_COLLECTION = gql`
{ 
    articleCollection {
        items {
            ${SEARCHABLE_FIELDS}
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