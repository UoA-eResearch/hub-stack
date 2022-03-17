'use strict';
const { Client } = require('@elastic/elasticsearch');
const AWS = require('aws-sdk');
const createAwsElasticsearchConnector = require('aws-elasticsearch-connector');
const contentfulExport = require('contentful-export');
const contentful = require('contentful')
const { formatResponse } = require('./helpers');


const mgmtToken = process.env.CONTENTFUL_MGMT_ACCESS_TOKEN;  // Contentful Management API Token
const token = process.env.CONTENTFUL_ACCESS_TOKEN;  // Contentful Delivery API Token
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const contentfulEnv = process.env.CONTENTFUL_ENVIRONMENT;

const region = 'ap-southeast-2';

const deliveryApiClient = contentful.createClient({
  space: spaceId,
  accessToken: token
})

const VALID_CONTENT_TYPES = ['article','casestudy','equipment','event', 'funding', 'service','software','subhub'];

let credentials;
try {
  // try getting credentials for the lambda from the AWS environment
  credentials = new AWS.EnvironmentCredentials('AWS');
  if (!credentials.sessionToken) {
    // we may be running this locally or from Jenkins, so try to get the credentials
    // from the local environment instead
    credentials = new AWS.SharedIniFileCredentials({profile: process.env.PROFILE});
  }
  if (!credentials.sessionToken) {
    throw new Error("Couldn't get credentials");
  }
} catch(error) {
  console.log(`Error getting AWS credentials: ${error}`);
}

AWS.config.update({
  credentials: credentials,
  region: region
});

const esClient = new Client({
    ...createAwsElasticsearchConnector(AWS.config),
    node: process.env.ELASTICSEARCH_ENDPOINT
});

const ELASTICSEARCH_INDEX_NAME = contentfulEnv;

module.exports.search = async (event, context) => {
  try {
    console.log(`Received query: ${event.body}`);
    const requestBody = JSON.parse(event.body);
    let queryString = '';
    let size = 10;
    let from = 0;
    let queryFilters = {};
    let queryFiltersCount = 0;
    let contentTypes = VALID_CONTENT_TYPES.slice();
    let sort = [];
    
    if (requestBody.hasOwnProperty('query')) {
      queryString = requestBody.query;
    }
    if (requestBody.hasOwnProperty('size')) {
      size = requestBody.size;
    }
    if (requestBody.hasOwnProperty('from')) {
      from = requestBody.from;
    }
    if (requestBody.hasOwnProperty('filters')) {
      queryFilters = requestBody.filters;
      for (let key of Object.keys(queryFilters)) {
        queryFiltersCount += queryFilters[key].length
      }      
    }
    if (requestBody.hasOwnProperty('includeContentTypes') && requestBody.includeContentTypes.length > 0) {
      contentTypes = requestBody.includeContentTypes.map(contentType => contentType.toLowerCase());
      for(const type of contentTypes) {
        if (!VALID_CONTENT_TYPES.includes(type)) {
          throw new Error(`Received invalid content type: ${type}. Valid types are: ${VALID_CONTENT_TYPES.join()}`);
        }
      }
    }
    if (requestBody.hasOwnProperty('sort')) {
      if(!(requestBody.sort === "A-Z" || requestBody.sort === "Z-A" || requestBody.sort === "" || requestBody.sort === "relevance")) {
        throw new Error('Sort options are A-Z, Z-A, or relevance.')
      }
      if (requestBody.sort === "A-Z") {
        sort.push({ "fields.title.en-US.raw": "asc" });
      }
      if (requestBody.sort === "Z-A") {
        sort.push({ "fields.title.en-US.raw": "desc" });
      }
    }

    let query;
    const includeInResult = [
      "fields.slug",
      "fields.title",
      "fields.summary",
      "fields.ssoProtected",
      "fields.searchable",
      "fields.keywords",
      "sys.contentType",
      "fields.category.en-US",
    ];

    if(queryString.length === 0 && queryFiltersCount === 0) {
      // query with no filters and no query string (fetch all searchable results)

      query = { 
        _source: {
          includes: includeInResult
        },
        query: {
          bool: {
            must: {
              match_all: {}
            },
            should: {
              multi_match: {
                query : "subhub",
                fields : [ "sys.contentType.sys.id^2"]  // boost match score for entries that are subhubs
              }
            },
            filter: [
              {
                term: {
                  "fields.searchable.en-US": true
                }
              },
              {
                terms: {
                  "sys.contentType.sys.id": contentTypes
                }
              }
            ]
          }
        },
        sort: sort
      };

    } else if(queryString.length === 0 && queryFiltersCount > 0) {
      // query with filters but no query string

      let queryParts = [];

      // add our search filters
      for (const filter in queryFilters) {
        if(!Array.isArray(queryFilters[filter])) {
          throw new Error('Query filters must be in array format.')
        }
        for (const id of queryFilters[filter]) {
          queryParts.push(
            JSON.parse(
              `{"match":{"fields.${filter}.en-US.sys.id":"${id}"}}`
            )
          )
        }
      }
    
      query = { 
        _source: {
          includes: includeInResult
        },
        query: {
          function_score: {
            query: {
              bool: {
                minimum_should_match: 1,
                should: queryParts,
                filter: [
                  {
                    term: {
                      "fields.searchable.en-US": true
                    }
                  },
                  {
                    terms: {
                      "sys.contentType.sys.id": contentTypes
                    }
                  }
                ]
              }
            },
            functions: [
              {
                filter: {"match":{"sys.contentType.sys.id": "subhub"}},
                weight: 2 // boost match score for entries that are subhubs
              }
            ]
          }
        },
        sort: sort
      };
    } else {
      // there is a query string and may or may not be any filters

      let formattedQueryString = queryString;
      
      // format the query string for fuzzy search if the query contains less than 5 words.
      // Also if the query string contains query operators dont make it fuzzy
      if (queryString.split(' ').length < 5 && !containsOperators(queryString)) {
        // modify degree of fuzziness here. 
        // Note: '~AUTO' is not supported currently despite what the docs say.
        const fuzziness = '~2';
        
        formattedQueryString = queryString.split(' ').map(s => {          
          // if word is less than 3 letters dont make it fuzzy
          return s.length < 3 ? s : s + fuzziness; 
        }).join(' ');
      }

      const simpleQuery = {
        simple_query_string: {
          query: formattedQueryString,
          default_operator: "and",
          analyzer: "hub_analyzer"
        }
      }

      let queryParts = []

      // add our search filters
      for (const filter in queryFilters) {
        if(!Array.isArray(queryFilters[filter])) {
          throw new Error('Query filters must be in array format.')
        }
        for (const id of queryFilters[filter]) {
          queryParts.push(
            JSON.parse(
              `{"match":{"fields.${filter}.en-US.sys.id":"${id}"}}`
            )
          )
        }
      }

      let minimum_should_match = 0;
      if (queryParts.length > 0) { minimum_should_match = 1 };
    
      query = { 
        _source: {
          includes: includeInResult
        },
        query: {
          function_score: {
            query: {
              bool: {
                must: simpleQuery,
                minimum_should_match: minimum_should_match,
                should: queryParts,
                filter: [
                  {
                    term: {
                      "fields.searchable.en-US": true
                    }
                  },
                  {
                    terms: {
                      "sys.contentType.sys.id": contentTypes
                    }
                  }
                ]
              }
            },
            functions: [
              {
                filter: {"match":{"fields.title.en-US": queryString}},
                weight: 2 // boost match score for titles that contain the individual query terms
              },
              {
                filter: {"match":{"fields.title.en-US.raw": queryString}},
                weight: 2 // boost match score for titles that contain the exact query terms (the 'raw' field is a keyword field meaning it is not tokenised)
              }
            ]
          }
        },
        sort: sort,
        highlight: {
          pre_tags : ["<b>"],
          post_tags : ["</b>"],
          fragment_size: 300,
          highlight_query: {simple_query_string: {
            query: queryString,
            default_operator: "and",
            analyzer: "hub_analyzer"
          }},
          fields: {
            "fields.summary.en-US": {}
          }
        }
      };
    }

    const params = {
      index: ELASTICSEARCH_INDEX_NAME,
      body: query,
      size: size,
      from: from
    }
    
    const result = await esClient.search(params);
    console.log(`Found ${result.body.hits.total.value} results.`);
    return formatResponse(
      200,
      { 
        query: queryString,
        result: result.body
      }
    )      
  } catch(error) {
    let statusCode = 500;
    if (error.hasOwnProperty("meta") && error.meta.statusCode) {
      statusCode = error.meta.statusCode;
    }
    return formatResponse(
      statusCode,
      { result: `${error.name}: ${error.message}` }
    );
  }
}

module.exports.update = async (event, context) => {
  try {
    let doc = JSON.parse(event.body);
    const categories = await deliveryApiClient.getEntries({
      content_type: "category",
      select: ['sys.id', 'fields.name']
    });

    // add category names
    if (doc.fields.hasOwnProperty('category')) {
      for (let item of doc.fields.category['en-US']) {
        const cat = categories.items.find((c) => { return c.sys.id === item.sys.id; });
        if (cat) {item['name'] = cat.fields.name;}
      }
    }

    const params = {
      id: event.pathParameters.id,
      index: ELASTICSEARCH_INDEX_NAME,
      body: {
        doc: doc,
        doc_as_upsert: true  // if doc doesn't exist, create it
      },
      refresh: 'true'   // index refresh
    };

    const result = await esClient.update(params);
    console.log(`Processed document id ${result.body._id}: ${result.body.result}.`);
    return formatResponse(
      200,
      { result: result.body }
    )
  } catch(error) {
    let statusCode = 500;
    if (error.hasOwnProperty("meta") && error.meta.statusCode) {
      statusCode = error.meta.statusCode;
    }
    return formatResponse(
      statusCode,
      { result: `${error.name}: ${error.message}` }
    );
  }
}

module.exports.delete = async (event, context) => {
  try {
    const params = {
      id: event.pathParameters.id,
      index: ELASTICSEARCH_INDEX_NAME,
      refresh: 'true'   // index refresh
    };
  
    const result = await esClient.delete(params);
    console.log(`Processed document id ${result.body._id}: ${result.body.result}.`);
    return formatResponse(
      200,
      { result: result.body }
    )
  } catch(error) {
    let statusCode = 500;
    if (error.hasOwnProperty("meta") && error.meta.statusCode) {
      statusCode = error.meta.statusCode;
    }
    return formatResponse(
      statusCode,
      { result: `${error.name}: ${error.message}` }
    );
  }
}

/**
 * Bulk upload handler
 */
module.exports.bulk = async () => {  
  let validEntries;
  const categories = await deliveryApiClient.getEntries({
    content_type: "category",
    select: ['sys.id', 'fields.name']
  });
  
  try {
    // contentful export and filter entries
    console.log('Exporting data from Contentful space id: ' + spaceId + ', environment: ' + contentfulEnv);
    const options = {
      spaceId: spaceId,
      managementToken: mgmtToken,
      environmentId: contentfulEnv,
      contentOnly: true,
      downloadAssets: false,
      saveFile: false
    };
    const contentfulData = await contentfulExport(options);
    validEntries = contentfulData.entries.filter(
      entry => VALID_CONTENT_TYPES.includes(entry.sys.contentType.sys.id.toLowerCase())
    );

    console.log(`Found ${validEntries.length} entries to upload.`);

    console.log('Transforming entries...');
    for(let entry of validEntries) {

      // add category names
      if (entry.fields.hasOwnProperty('category')) {
        for (let item of entry.fields.category['en-US']) {
          const cat = categories.items.find((c) => { return c.sys.id === item.sys.id; });
          if (cat) {item['name'] = cat.fields.name;}
        }
      }    
    };
    
    // perform the upload
    console.log(`Uploading documents to index: ${ELASTICSEARCH_INDEX_NAME}`);
    const bulkBody = validEntries.flatMap((doc) => [
      { update: { _index: ELASTICSEARCH_INDEX_NAME, _id: doc.sys.id } },
      { doc: doc, doc_as_upsert: true },
    ]);
    const { body: bulkResponse } = await esClient.bulk({ refresh: true, body: bulkBody });        
    const erroredDocuments = []
    if (bulkResponse.errors) {
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0]
        if (action[operation].error) {
          erroredDocuments.push({
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should
            // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          })
        }
      })
    }
    
    return formatResponse(
      200,
      {
        total: validEntries.length,
        result: bulkResponse,
        erroredDocuments: erroredDocuments
      }
    )
  } catch(error) {
    let statusCode = 500;
    if (error.hasOwnProperty("meta") && error.meta.statusCode) {
      statusCode = error.meta.statusCode;
    }
    return formatResponse(
      statusCode,
      { result: `${error.name}: ${error.message}` }
    );
  }
}

function containsOperators(queryString) {
  const queryOperators = ['+', '|', '-', '*', '"', '(', ')'];
  return queryOperators.some(operator => queryString.includes(operator));
}
