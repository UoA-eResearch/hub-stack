import { gql } from "apollo-server";

// List of fields that do not require SSO for different types
const ALWAYS_PUBLIC_FIELDS = [
    'title',
    'summary',
    'ssoProtected',
    'name'
]

// Fields that will be for searching
export const SEARCHABLE_FIELDS = ['title', 'summary', 'ssoProtected'];

export const GET_ARTICLE_COLLECTION = gql`
{ 
    articleCollection {
        items {
            ${SEARCHABLE_FIELDS}
        }
    }
}
`;

export const GET_ARTICLE_COLLECTION_PRIVATE = gql`
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

export const GET_ARTICLE_COLLECTION_PRIVATE_WITH_SSO = gql`
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

export const GET_SUBHUB_COLLECTION = gql`
{ 
    subHubCollection {
        items {
            ${SEARCHABLE_FIELDS}
        }
    }
}
`;

export const GET_EQUIPMENT_COLLECTION = gql`
{ 
    equipmentCollection {
        items {
            ${SEARCHABLE_FIELDS}
        }
    }
}
`;

export const GET_ARTICLE_BY_SYS_ID = gql`
    query ($id: String!) { 
        article(id: $id) {
            title 
            ssoProtected
        }
    }
`;

export const GET_ARTICLE_BY_SYS_ID_PRIVATE = gql`
    query ($id: String!) { 
        article(id: $id) {
            bodyText {
                json
            } 
        }
    }
`;

export const GET_ARTICLE_BY_WHERE = gql`
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

export const ALIASING_SSOPROTECTED_QUERY = gql`
{ 
    articleCollection {
        items {
            aPhoneFieldThatPretendsToBeReal: ssoProtected
        }
    }
}`;

export const GET_ARTICLE_COLLECTION_PRIVATE_FRAGMENT = gql`
{
    articleCollection {
      items {
        ...PrivateFields
      }
    }
  }
  
  fragment PrivateFields on Article {
    owner {
      name
    }
  }
`

export const GET_ARTICLE_COLLECTION_NESTED_PROTECTED_FIELD = gql`
{
    articleCollection {
      items {
        ssoProtected
        relatedItemsCollection {
          items {
            ...ProtectedField
          }
        }
      }
    }
  }
  
  fragment ProtectedField on Article {
          callToAction
  }
  `

export const GET_SUBHUB_COLLECTION_NESTED_ITEMS_FIELD = gql`
{
    subHubCollection {
        items {
            ssoProtected
            linkedFrom {
                subHubCollection  {
                    items{
                        slug
                    }
                }
            }
        }
    }
}
`