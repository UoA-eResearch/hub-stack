"use strict";
const https = require("https");
const utils = require("@uoa/utilities");
const { v4: uuidv4 } = require("uuid");

module.exports.main = async (event) => {
  // console.log(`Received event: \n ${JSON.stringify(event, null, 2)}`);

  // POST Request Handler (search query)
  if (event.httpMethod === "POST" && event.body) {
    console.log({event})
    let queryString = JSON.parse(event.body).query;
    console.log(`Received query string: ${queryString}`); 

    try {
      let req = { // The query object to be sent to Contentful
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

      let res = await getRes(req) // The response from contentful
        .then(res => res.hits.hits)
      console.log(JSON.stringify(res, null, 2));

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "Welcome to hub-search-proxy",
          your_request: event.body,
          aws_message: process.env.EXAMPLE_KEY,
          result: res
        }),
      };

    } catch(e){console.error(e) }
  }

  /******************* */
  async function getRes(data = null) {
    const options = {
      method: data ? "POST" : "GET",
      hostname: '6436fa2b0fdd4163bbfd2ea48a8bfd4d.ap-southeast-2.aws.found.io',
      port: 9243,
      path: '/_search/',
      headers: {
        "Authorization": "Basic " + process.env.ELASTICSEARCH_API_KEY,
        "Content-Type": "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      let request = https.request(options, (res) => {
        res.setEncoding("utf8");
        let body = "";

        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve(JSON.parse(body)));
        res.on("error", (e) => reject(e));
      });
      request.write(JSON.stringify(data));
      request.end();
    });
  }
};
