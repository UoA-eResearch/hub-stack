// thanks to https://blog.jayway.com/2018/09/11/aws-elasticsearch-javascript-client/

'use strict';

const path = require('path');
const AWS = require('aws-sdk');

const endpoint = new AWS.Endpoint(process.env.ELASTICSEARCH_ENDPOINT);
const region = 'ap-southeast-2';
const httpClient = new AWS.HttpClient();
const credentials = new AWS.EnvironmentCredentials('AWS');

/**
 * Sends a request to Elasticsearch
 *
 * @param {string} httpMethod - The HTTP method, e.g. 'GET', 'PUT', 'DELETE', etc
 * @param {string} requestPath - The HTTP path (relative to the Elasticsearch domain), e.g. '.kibana'
 * @param {Object} [payload] - An optional JavaScript object that will be serialized to the HTTP request body
 * @returns {Promise} Promise - object with the result of the HTTP response
 */
function sendRequest({ httpMethod, requestPath, payload }) {
  const request = new AWS.HttpRequest(endpoint, region);

  request.method = httpMethod;
  request.path = path.join(request.path, requestPath);
  request.body = JSON.stringify(payload);
  request.headers['Content-Type'] = 'application/json';
  request.headers['Host'] = endpoint.host;

  console.log("Signing request...");
  const signer = new AWS.Signers.V4(request, 'es');
  signer.addAuthorization(credentials, new Date());

  console.log("Sending request to ElasticSearch...");
  return new Promise((resolve, reject) => {
    httpClient.handleRequest(request, null,
      response => {
        const { statusCode, statusMessage, headers } = response;
        let body = '';
        response.on('data', chunk => {
          body += chunk;
        });
        response.on('end', () => {
          const data = {
            statusCode,
            statusMessage,
            headers
          };
          if (body) {
            data.body = JSON.parse(body);
          }
          resolve(data);
        });
      },
      err => {
        reject(err);
      });
  });
}

module.exports = sendRequest;