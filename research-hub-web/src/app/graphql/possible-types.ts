
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
            "name": "LinkCard"
          },
          {
            "name": "Article"
          },
          {
            "name": "SubHub"
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
            "name": "Person"
          },
          {
            "name": "OfficialDocuments"
          },
          {
            "name": "GenericContact"
          },
          {
            "name": "Event"
          },
          {
            "name": "Software"
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
        "name": "EquipmentRelatedItemsItem",
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
      }
    ]
  }
};
      export default result;
    