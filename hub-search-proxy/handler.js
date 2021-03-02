'use strict';
const { Client } = require('@elastic/elasticsearch');
const AWS = require('aws-sdk');
const createAwsElasticsearchConnector = require('aws-elasticsearch-connector');
const contentfulExport = require('contentful-export');

const token = process.env.CONTENTFUL_ACCESS_TOKEN;
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const credentials = new AWS.EnvironmentCredentials('AWS');
const region = 'ap-southeast-2';

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
  const requestBody = JSON.parse(event.body);
  let queryString = '';
  let size = 10;
  let from = 0;
  
  if (requestBody.hasOwnProperty('query')) {
    queryString = requestBody.query;
  }
  if (requestBody.hasOwnProperty('size')) {
    size = requestBody.size;
  }
  if (requestBody.hasOwnProperty('from')) {
    from = requestBody.from;
  }

  // allow fuzziness, but only if query isn't empty
  queryString = queryString.length > 0 ? queryString + '~AUTO' : queryString;

  console.log(`Received query string: ${queryString}`); 

  let query = { // The query object to be sent to ElasticSearch
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
        must: [
          {
            simple_query_string: {
              query: queryString
            }
          },
          {
            term: {
              "fields.searchable.en-US": true
            }
          }
        ]
      }
    }
  };

  const params = {
    index: ELASTICSEARCH_INDEX_NAME,
    body: query,
    size: size,
    from: from
  }

  try {
    const result = await esClient.search(params);
    console.log(result);
    return formatResponse(
      200,
      { 
        query: queryString,
        result: result.body
      }
    )
  } catch(error) {
    return formatResponse(
      error.statusCode,
      { result: error }
    )
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
    console.log(result);
    return formatResponse(
      200,
      { result: result.body }
    )
  } catch(error) {
    return formatResponse(
      error.statusCode,
      { result: error }
    )
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
    console.log(result);
    return formatResponse(
      200,
      { result: result.body }
    )
  } catch(error) {
    return formatResponse(
      error.statusCode,
      { result: error }
    )
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
  } catch(error) {
    return formatResponse(
      500,
      { result: error }
    )
  }

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
  try {
    console.log(`Uploading documents to index: ${ELASTICSEARCH_INDEX_NAME}`);
    const result = await esClient.helpers.bulk(params);
    return formatResponse(
      200,
      { result: result }
    )
  } catch(error) {
    return formatResponse(
      500,
      { result: error }
    )
  }
}

function formatResponse(status, body) {
  return {
      statusCode: status,
      body: JSON.stringify(body),
      headers: {
          "Access-Control-Allow-Origin": process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGINS
      }
  }
}
