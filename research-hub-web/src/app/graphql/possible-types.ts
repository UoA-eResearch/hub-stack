
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
            "name": "Equipment"
          },
          {
            "name": "SubHub"
          },
          {
            "name": "CaseStudy"
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
            "name": "Testing"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "SubHubSubhubPagesItem",
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
      }
    ]
  }
};
      export default result;
    