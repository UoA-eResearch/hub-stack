"use strict";
// const https = require("https");
// const utils = require("@uoa/utilities");
// const { v4: uuidv4 } = require("uuid");

const AWS = require('aws-sdk');
var path = require('path');

const esDomain = {
  endpoint: process.env.ELASTICSEARCH_ENDPOINT,
  region: 'ap-southeast-2',
  index: 'main-index'
};
const endpoint =  new AWS.Endpoint(esDomain.endpoint);
/*
 * The AWS credentials are picked up from the environment.
 * They belong to the IAM role assigned to the Lambda function.
 * Since the ES requests are signed using these credentials,
 * we apply a policy that permits ES domain operations
 * to the role (see serverless.yml).
 */
const creds = new AWS.EnvironmentCredentials('AWS');


module.exports.main = async (event, context) => {

  // POST Request Handler (search query)
  if (event.httpMethod === "POST" && event.body) {
    console.log({event})
    let queryString = JSON.parse(event.body).query;
    console.log(`Received query string: ${queryString}`); 

    try {
      let req = new AWS.HttpRequest(endpoint);
      req.method = 'POST';
      req.path = path.join('/', esDomain.index, '_search/');
      console.log(req.path);
      req.region = esDomain.region;
      req.headers['presigned-expires'] = false;
      req.headers['Host'] = endpoint.host;

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
                  query: `${queryString}~2`
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

      req.body = JSON.stringify(query);
      
      // Sign the request (Sigv4)
      var signer = new AWS.Signers.V4(req, 'es');
      signer.addAuthorization(creds, new Date());

      // Post query to ES
      var send = new AWS.NodeHttpClient();
      send.handleRequest(req, null, function(httpResp) {
        var respBody = '';
        httpResp.on('data', function (chunk) {
          respBody += chunk;
        });
        httpResp.on('end', function (chunk) {
          // Mark lambda success.  If not done so, it will be retried.
          return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              message: "Welcome to hub-search-proxy",
              your_request: event.body,
              result: respBody
            }),
          };
          //context.succeed();
        });
      }, function(err) {
          console.log('Error: ' + err);
          context.fail('Lambda failed with error ' + err);
      });

      // let res = await getRes(req) // The response from ElasticSearch
      //   .then(res => res.hits.hits)
      // console.log(JSON.stringify(res, null, 2));

      // return {
      //   statusCode: 200,
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      //   },
      //   body: JSON.stringify({
      //     message: "Welcome to hub-search-proxy",
      //     your_request: event.body,
      //     result: res
      //   }),
      // };

    } catch(e){console.error(e) }
  }
}

  /******************* */
//   async function getRes(data = null) {
//     const options = {
//       method: data ? "POST" : "GET",
//       hostname: '6436fa2b0fdd4163bbfd2ea48a8bfd4d.ap-southeast-2.aws.found.io',  // UPDATE THIS
//       port: 9243,
//       path: '/_search/',  
//       headers: {
//         "Authorization": "Basic " + process.env.ELASTICSEARCH_API_KEY,
//         "Content-Type": "application/json",
//       },
//     };

//     return new Promise((resolve, reject) => {
//       let request = https.request(options, (res) => {
//         res.setEncoding("utf8");
//         let body = "";

//         res.on("data", (chunk) => (body += chunk));
//         res.on("end", () => resolve(JSON.parse(body)));
//         res.on("error", (e) => reject(e));
//       });
//       request.write(JSON.stringify(data));
//       request.end();
//     });
//   }
// };
