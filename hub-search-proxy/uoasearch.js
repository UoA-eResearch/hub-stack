'use strict';
const { formatResponse, httpPostRequest } = require('./helpers');

const AWS = require('aws-sdk');
AWS.config.region = 'ap-southeast-2';
const servmgr = new AWS.SSM();

/**
 * UoA Swiftype Search handler
 */
module.exports.search = async (event) => {
  console.log(`Received query: ${event.body}`);
  try {
    var ssmParams = {
      Names: [
        process.env.SWIFTYPE_API_KEY_PATH
      ],
      WithDecryption: true
    };
    const ssmData = await servmgr.getParameters(ssmParams).promise();
    const SWIFTYPE_API_KEY = ssmData.Parameters.find(element => element.Name === process.env.SWIFTYPE_API_KEY_PATH).Value;
    
    const requestBody = JSON.parse(event.body);
    let query = '';
    let size = 10;
    let page = 0;
    let sort;
    
    if (requestBody.hasOwnProperty('query')) {
      query = requestBody.query;
    }
    if (requestBody.hasOwnProperty('size')) {
      size = requestBody.size;
    }
    if (requestBody.hasOwnProperty('page')) {
      page = requestBody.page;
    }
    if (requestBody.hasOwnProperty('sort')) {
      if(!(requestBody.sort === "A-Z" || requestBody.sort === "Z-A" || requestBody.sort === "" || requestBody.sort === "relevance")) {
        throw new Error('Sort options are A-Z, Z-A, or relevance.')
      }
      if (requestBody.sort === "A-Z") {
        sort = "asc";
      }
      if (requestBody.sort === "Z-A") {
        sort = "desc";
      }
    }

    const body = {
      q: query,
      per_page: size,
      page: page,
      filters: {
        page: {
          collection: "Staff_intranet"
        }
      }
    }

    if (sort) {
      body.sort_field = { page : "title" };
      body.sort_direction = { page : sort };
    }
    
    const result = await httpPostRequest(
      process.env.SWIFTYPE_URL,
      '/api/v1/public/engines/search.json?engine_key=' + SWIFTYPE_API_KEY,
      body
    );

    console.log(`Found ${result.info.page.total_result_count} results.`);

    return formatResponse(
      200,
      { 
        query: query,
        result: result
      }
    )
  } catch(error) {
    console.log(error);
    return formatResponse(
      500,
      { result: `${error.name}: ${error.message}` }
    );
  }
}
