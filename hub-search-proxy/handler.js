'use strict';

const sendElasticsearchRequest = require('./elasticsearch-client');

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
    httpMethod: 'POST',
    requestPath: 'main-index/_search',
    payload: query
  };

  try {
    const result = await sendElasticsearchRequest(params);
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
  console.log(event);
  let doc = JSON.parse(event.body);

  const params = {
    httpMethod: 'PUT',
    requestPath: `main-index/_doc/${event.pathParameters.id}`,
    payload: doc
  };

  try {
    const result = await sendElasticsearchRequest(params);
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
  console.log(event);

  const params = {
    httpMethod: 'DELETE',
    requestPath: `main-index/_doc/${event.pathParameters.id}`
  };

  try {
    const result = await sendElasticsearchRequest(params);
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