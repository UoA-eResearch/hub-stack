'use strict';
const { Client } = require('@elastic/elasticsearch');
const AWS = require('aws-sdk');
const createAwsElasticsearchConnector = require('aws-elasticsearch-connector');
const contentfulExport = require('contentful-export');

const token = process.env.CONTENTFUL_ACCESS_TOKEN;
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const region = 'ap-southeast-2';

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

const ELASTICSEARCH_INDEX_NAME = 'contentful';

module.exports.search = async (event, context) => {
  try {
    console.log(`Received query: ${event.body}`);
    const requestBody = JSON.parse(event.body);
    let queryString = '';
    let size = 10;
    let from = 0;
    let queryFilters = {};
    let contentTypes = ["article","casestudy","equipment","event","service","software","subhub"];
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
    }
    if (requestBody.hasOwnProperty('includeContentTypes') && requestBody.includeContentTypes.length > 0) {
      const validContentTypes = ["article","casestudy","equipment","event","service","software","subhub"];
      contentTypes = requestBody.includeContentTypes.map(contentType => contentType.toLowerCase());
      for(const type of contentTypes) {
        if (!validContentTypes.includes(type)) {
          throw new Error(`Received invalid content type: ${type}. Valid types are: article, casestudy, equipment, event, service, software, subhub`);
        }
      }
    }
    if (requestBody.hasOwnProperty('sort')) {
      if(!(requestBody.sort === "A-Z" || requestBody.sort === "Z-A" || requestBody.sort === "")) {
        throw new Error('Sort options are A-Z or Z-A. Pass empty string or no sort property for sorting by score.')
      }
      if (requestBody.sort === "A-Z") {
        sort.push({ "fields.title.en-US.raw": "asc" });
      }
      if (requestBody.sort === "Z-A") {
        sort.push({ "fields.title.en-US.raw": "desc" });
      }
    }

    let query;

    if(queryString.length === 0 && Object.keys(queryFilters).length === 0) {
      query = { 
        _source: {
          includes: [
            "fields.slug",
            "fields.title",
            "fields.summary",
            "fields.ssoProtected",
            "fields.searchable",
            "fields.keywords",
            "sys.contentType"
          ]
        },
        query: {
          bool: {
            must: {
              match_all: {}
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

    } else if(queryString.length === 0 && Object.keys(queryFilters).length > 0) {
      // query with filters but no text search

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
          includes: [
            "fields.slug",
            "fields.title",
            "fields.summary",
            "fields.ssoProtected",
            "fields.searchable",
            "fields.keywords",
            "sys.contentType"
          ]
        },
        query: { 
          bool: {
            must: queryParts,
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
    } else {
      // there is a query string and may or may not be any filters

      // format the query string for fuzzy search
      const excludedWords = ['and', 'or', 'not', 'a', 'the', '+', '|', '-', '*', '(', ')'];
      const formattedQueryString = queryString.split(' ').map(s => {
        return excludedWords.includes(s) ? s : s + '~1'
      }).join(' ') // make every word fuzzy (except excluded words). Note that this makes the query a little inefficient.
      
      console.log(`Formatted query: ${formattedQueryString}`);

      let queryParts = [
        {
          simple_query_string: {
            query: formattedQueryString
          }
        }
      ]

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
          includes: [
            "fields.slug",
            "fields.title",
            "fields.summary",
            "fields.ssoProtected",
            "fields.searchable",
            "fields.keywords",
            "sys.contentType"
          ]
        },
        query: { 
          bool: {
            must: queryParts,
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
  let doc = JSON.parse(event.body);

  const params = {
    id: event.pathParameters.id,
    index: ELASTICSEARCH_INDEX_NAME,
    body: {
      doc: doc,
      doc_as_upsert: true  // if doc doesn't exist, create it
    },
    refresh: 'true'   // index refresh
  };

  try {
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
  const params = {
    id: event.pathParameters.id,
    index: ELASTICSEARCH_INDEX_NAME,
    refresh: 'true'   // index refresh
  };

  try {
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
 * Bulk upload handler.
 * Uses client helper: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/client-helpers.html
 */
module.exports.bulk = async () => {
  console.log("Bulk operation initiated.");
  
  let validEntries;
  const validContentTypes = ['article','caseStudy','equipment','event','service','software','subHub'];

  // contentful export and filter entries
  try {
    console.log('Exporting data from Contentful space id: ' + spaceId);
    const options = {
      spaceId: spaceId,
      managementToken: token,
      contentOnly: true,
      downloadAssets: false,
      saveFile: false
    };
    const contentfulData = await contentfulExport(options);
    validEntries = contentfulData.entries.filter(
      entry => validContentTypes.includes(entry.sys.contentType.sys.id)
    );

    console.log(`Found ${validEntries.length} entries to upload.`);

    // bulk upload settings
    const params = {
      datasource: validEntries,
      onDocument (doc) {
        return [
          { update: { _index: ELASTICSEARCH_INDEX_NAME, _id: doc.sys.id } },
          { doc: doc, doc_as_upsert: true }
        ]
      },
      onDrop (doc) {  // called everytime a document can’t be indexed and it has reached the maximum amount of retries.
        console.log(doc);
      },
      refreshOnCompletion: true, // Refresh the index after this
      wait: 3000,   // How much time to wait before retries in milliseconds
      retries: 3,   // How many times a document will be retried before to call the onDrop callback
      concurrency: 5,  // How many request will be executed at the same time.
      flushBytes: 5000000,  // The size of the bulk body in bytes to reach before to send it. Default of 5MB.
    };

    // perform the upload
    console.log(`Uploading documents to index: ${ELASTICSEARCH_INDEX_NAME}`);
    const result = await esClient.helpers.bulk(params);
    return formatResponse(
      200,
      { result: result }
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

function formatResponse(status, body) {
  return {
      isBase64Encoded: false,
      statusCode: status,
      body: JSON.stringify(body),
      headers: {
          "Access-Control-Allow-Origin": process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGINS,
          "Content-Type": "application/json"
      }
  }
}
