'use strict';
const { Client } = require('@elastic/elasticsearch');
const AWS = require('aws-sdk');
const createAwsElasticsearchConnector = require('aws-elasticsearch-connector');

const credentials = new AWS.EnvironmentCredentials('AWS');
const region = 'ap-southeast-2';
console.log(JSON.stringify(credentials));

AWS.config.update({
  credentials: credentials,
  region: region
});

const esClient = new Client({
    ...createAwsElasticsearchConnector(AWS.config),
    node: process.env.ELASTICSEARCH_ENDPOINT
});

const ELASTICSEARCH_INDEX_NAME = 'main-index';

module.exports.search = async (event, context) => {
  const requestBody = JSON.parse(event.body);
  let queryString = '';
  if (requestBody.hasOwnProperty('query')) {
    queryString = requestBody.query;
  }
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
              query: `${queryString}~AUTO`
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
    q: query
  }

  try {
    console.log('starting search...');
    const result = await esClient.search(params);
    console.log(result);
    return formatResponse(
      JSON.stringify({
        query: queryString,
        result: result.body
      }
    ))
  } catch(error) {
    return formatError(error)
  }
}

module.exports.update = async (event, context) => {
  let doc = JSON.parse(event.body);

  const params = {
    id: event.pathParameters.id,
    index: ELASTICSEARCH_INDEX_NAME,
    body: doc,
    refresh: 'true'   // index refresh
  };

  try {
    const result = await esClient.update(params);
    console.log(result);
    return formatResponse(
      JSON.stringify({
        result: result.body
      }
    ))
  } catch(error) {
    return formatError(error)
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
      JSON.stringify({
        result: result.body
      }
    ))
  } catch(error) {
    return formatError(error)
  }
}

var formatResponse = function(body){
  var response = {
    "statusCode": 200,
    "headers": {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    "body": body
  }
  return response
}

var formatError = function(error){
  var response = {
    "statusCode": error.statusCode,
    "headers": {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*"
    },
    "body": error.code + ": " + error.message
  }
  return response
}