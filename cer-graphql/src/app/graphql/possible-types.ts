
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
            "name": "Event"
          },
          {
            "name": "SubHub"
          },
          {
            "name": "Software"
          },
          {
            "name": "Service"
          },
          {
            "name": "Equipment"
          },
          {
            "name": "Article"
          },
          {
            "name": "Person"
          },
          {
            "name": "CaseStudy"
          },
          {
            "name": "OrgUnit"
          },
          {
            "name": "OfficialDocuments"
          },
          {
            "name": "Category"
          },
          {
            "name": "Stage"
          },
          {
            "name": "LinkCard"
          },
          {
            "name": "FieldTestType"
          },
          {
            "name": "PartFeaturedItem"
          },
          {
            "name": "Video"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ArticleRelatedContactsItem",
        "possibleTypes": [
          {
            "name": "Person"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "CaseStudyRelatedContactsItem",
        "possibleTypes": [
          {
            "name": "Person"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ArticleRelatedItemsItem",
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
            "name": "Event"
          },
          {
            "name": "Service"
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
        "name": "EquipmentRelatedContactsItem",
        "possibleTypes": [
          {
            "name": "Person"
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
            "name": "Event"
          },
          {
            "name": "Service"
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
        "name": "ServiceRelatedContactsItem",
        "possibleTypes": [
          {
            "name": "Person"
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
            "name": "Event"
          },
          {
            "name": "Service"
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
        "name": "SoftwareRelatedContactsItem",
        "possibleTypes": [
          {
            "name": "Person"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "SoftwareRelatedItemsItem",
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
            "name": "Event"
          },
          {
            "name": "Service"
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
        "name": "SubHubInternalPagesItem",
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
            "name": "Event"
          },
          {
            "name": "Service"
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
        "name": "SubHubExternalPagesItem",
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
            "name": "Event"
          },
          {
            "name": "Service"
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
            "name": "Event"
          },
          {
            "name": "Service"
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
        "name": "EventRelatedContactsItem",
        "possibleTypes": [
          {
            "name": "Person"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "EventRelatedItemsItem",
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
            "name": "Event"
          },
          {
            "name": "Service"
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
        "name": "EventRelatedDocsItem",
        "possibleTypes": [
          {
            "name": "OfficialDocuments"
          },
          {
            "name": "LinkCard"
          }
        ]
      }
    ]
  }
};
      export default result;
    