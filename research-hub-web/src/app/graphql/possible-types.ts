
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "Entry",
        "possibleTypes": [
          {
            "name": "Article"
          },
          {
            "name": "OrganisationalUnit"
          },
          {
            "name": "Service"
          },
          {
            "name": "SubHub"
          },
          {
            "name": "CaseStudy"
          },
          {
            "name": "Person"
          },
          {
            "name": "Equipment"
          },
          {
            "name": "GenericContact"
          },
          {
            "name": "OfficialDocuments"
          },
          {
            "name": "Event"
          },
          {
            "name": "Software"
          },
          {
            "name": "LinkCard"
          },
          {
            "name": "Video"
          },
          {
            "name": "Testing"
          },
          {
            "name": "TestContentType"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "SubHubExternalSubHubPage",
        "possibleTypes": [
          {
            "name": "Article"
          },
          {
            "name": "CaseStudy"
          },
          {
            "name": "Equipment"
          },
          {
            "name": "Service"
          },
          {
            "name": "SubHub"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "EquipmentUserFacingSupportItem",
        "possibleTypes": [
          {
            "name": "GenericContact"
          },
          {
            "name": "Person"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "EquipmentEquipmentOwnerItem",
        "possibleTypes": [
          {
            "name": "GenericContact"
          },
          {
            "name": "Person"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "SubHubRelatedItemsItem",
        "possibleTypes": [
          {
            "name": "Article"
          },
          {
            "name": "CaseStudy"
          },
          {
            "name": "Equipment"
          },
          {
            "name": "OfficialDocuments"
          },
          {
            "name": "Service"
          },
          {
            "name": "SubHub"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ServiceRelatedItemsItem",
        "possibleTypes": [
          {
            "name": "Article"
          },
          {
            "name": "CaseStudy"
          },
          {
            "name": "Equipment"
          },
          {
            "name": "Service"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "OrganisationalUnitContactsItem",
        "possibleTypes": [
          {
            "name": "GenericContact"
          },
          {
            "name": "Person"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "OrganisationalUnitRelatedItemsItem",
        "possibleTypes": [
          {
            "name": "Article"
          },
          {
            "name": "Equipment"
          },
          {
            "name": "Software"
          },
          {
            "name": "SubHub"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ArticleRelatedContactsItem",
        "possibleTypes": [
          {
            "name": "GenericContact"
          },
          {
            "name": "Person"
          }
        ]
      }
    ]
  }
};
      export default result;
    