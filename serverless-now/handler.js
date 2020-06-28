'use strict';
const https = require('https')
const utils = require('@uoa/utilities')

module.exports.main = async event => {
  const BASE_URL = `api.${process.env.ENV}.auckland.ac.nz`;

  try {
    let cognitoDomain = process.env.COGNITO_DOMAIN;
    let data = await utils.getUserInfo(event, cognitoDomain);
    if (data.error) {
      // return buildResponse(500, { 'message': 'User not found' });
      console.log('User not found.')
    } else {
      // personId = data['custom:EmpID'];
      console.log('User data:');
      console.log(data);
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
      }
    }
  } catch (e) {
    // return buildResponse(500, { 'message': 'Error getting user' });
    console.log('Error getting user.');
  }

  // POST (Create) a new ServiceNow ticket
  if (event.httpMethod === "POST" && event.body) {
    // TODO: Enable POST to ServiceNow
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Creating ticket',
        object: event.body
      })
    };
  }

  // GET a ServiceNow ticket by ticket ID URL parameter
  if (event.queryStringParameters && event.queryStringParameters.ticketId) {
    try {
      // TODO: Replace hardcoded ticket with ${event.queryStringParameters.ticketId}
      return await getRes(`/service/servicenow-readonly/table/u_request?sysparm_query=number=REQ1216647&sysparm_display_value=all`, process.env.SN_API_KEY_R)
        .then(res => ([res] = res.result) ? // Destructure to first object in result array (first ticket)
          { statusCode: 200, body: JSON.stringify(res) } :
          { statusCode: 500, body: JSON.stringify('Error retrieving ticket from ServiceNow') })
    } catch (error) {
      console.error(error);
      return { statusCode: 500, body: JSON.stringify('Task failed successfully: ', error) };
    }
  }

  // Default '/' page
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      message: 'Welcome to serverless-now',
      aws_message: process.env.EXAMPLE_KEY
    })
  };

  // Function for getting data and returning the JSON result
  // Will make a POST request if the optional data argument is passed
  async function getRes(path, apiKey, data = null) {

    // Request options
    const options = {
      method: data ? 'POST' : 'GET',
      hostname: BASE_URL,
      path: path,
      headers: {
        apiKey: apiKey
      }
    };

    return new Promise((resolve, reject) => {
      let request = https.request(options, res => {
        res.setEncoding('utf8');
        let body = '';

        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(JSON.parse(body)));
        res.on('error', e => reject((e)));
      });

      data && request.write(JSON.stringify(data)) || request.end(); // Optionally write POST data then execute
    });
  }

};