"use strict";
const mochaPlugin = require("serverless-mocha-plugin");
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper("main", "/handler.js", "main");
const fetch = require('node-fetch');
const aws = require('aws-sdk');
<<<<<<< HEAD
const crypto = require('crypto');
const aws4 = require('aws4');
=======
const aws4 = require('aws4');

const TIMEOUT_PERIOD = 20000;

const configResult = require('dotenv').config({ path: '../.env' });
if (configResult.error) {
  throw configResult.error;
}
>>>>>>> b42ce07a3b018e535df98a4ede7838165c12193d

// Function to return the JSON parsed response body
let getResBody = async (req) =>
  await wrapped.run(req).then((res) => JSON.parse(res.body));

/**
 * Gets the credentials stored locally on file, 
 * assigns them to aws config and returns the credential object.
 */
const getAwsCredentials = () => {
  let credentials = new aws.SharedIniFileCredentials({
    profile: process.env.awsProfile,
  });
<<<<<<< HEAD
  credentials = credentials;
  return credentials;
}

const getTokens = async () => {
  let awsCreds = getAwsCredentials();
  let opts = {
    host: 'ef54vsv71a.execute-api.ap-southeast-2.amazonaws.com',
    path: '/sandbox/',
    region: 'ap-southeast-2',
    service: 'execute-api',
=======
  if (credentials.sessionToken === undefined) {
    // falling back to local def profile.
    console.log("Couldn't find aws profile matching environment variable awsProfile. Falling back to saml profile for local development.");
    credentials = new aws.SharedIniFileCredentials({
      profile: 'saml',
    });
  }
  return credentials;
}

/**
 * Retrieves OAuth2.0 tokens by making a request from the 2FAB lambda function.
 */
const getTokens = async () => {
  // Generating AWS4 Signature from locally stored aws tokens.
  let awsCreds = getAwsCredentials();
  let opts = {
    host: process.env.OAUTH_LAMBDA_HOST,
    path: process.env.OAUTH_LAMBDA_PATH,
    region: process.env.OAUTH_LAMBDA_REGION,
    service: process.env.OAUTH_LAMBDA_SERVICE,
>>>>>>> b42ce07a3b018e535df98a4ede7838165c12193d
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br'
  };
  aws4.sign(opts, {
    accessKeyId: awsCreds.accessKeyId,
    secretAccessKey: awsCreds.secretAccessKey,
    sessionToken: awsCreds.sessionToken
  });
<<<<<<< HEAD
  let res = await fetch('https://ef54vsv71a.execute-api.ap-southeast-2.amazonaws.com/sandbox/', opts);
  const resJson = await res.json();
  return resJson;
=======

  // making request to 2FAB with AWS4 Signature. Returning response which should contain OAuth tokens.
  return await fetch(`https://${opts.host}${opts.path}`, opts)
    .then(res => res.json());
>>>>>>> b42ce07a3b018e535df98a4ede7838165c12193d
}

describe("serverless-now", () => {
  // Example values used for ServiceNow testing
  const EXAMPLE_TICKET_ID = "REQ1216647";
  const EXAMPLE_TICKET_SHORT_DESCRIPTION = "Storage request 123";
  const EXAMPLE_UPI = "skav012";
  const EXAMPLE_SECRET_VALUE = "Welcome to serverless-now from AWS";

  it("displays greeting message", async () => {
    const resBody = await getResBody({});
    expect(resBody.message).to.equal("Welcome to serverless-now");
  });

  it("displays a status code 200", async () => {
    const response = await wrapped.run({});
    expect(response.statusCode).to.equal(200);
  });

  it("displays URL query strings back", async () => {
    const resBody = await getResBody({
      queryStringParameters: { ticketId: EXAMPLE_TICKET_ID },
    });
    expect(resBody.number.value).to.equal(EXAMPLE_TICKET_ID);
  });

  it("POST request returns a response from service now.", async function () {
<<<<<<< HEAD
    this.timeout(20000);
=======
    this.timeout(TIMEOUT_PERIOD);
>>>>>>> b42ce07a3b018e535df98a4ede7838165c12193d
    let authTokens = await getTokens();
    const resBody = await getResBody({
      httpMethod: "POST",
      headers: {
        'Authorization': `Bearer ${authTokens['access_token']}`,
        'Content-Type': 'application/json'
      },
      body: {
        upi: EXAMPLE_UPI,
        comment: "Example ticket comment.",
      },
    });
    expect(resBody.status).to.equal('error');
<<<<<<< HEAD
    return;
=======
>>>>>>> b42ce07a3b018e535df98a4ede7838165c12193d
  });

  it("returns a decrypted example secret from AWS parameter store", async () => {
    const resBody = await getResBody({});
    expect(resBody.aws_message).to.equal(EXAMPLE_SECRET_VALUE);
  });

  xit("returns the UPI of the requestor");
  xit("returns an error if an unauthenticated user accesses this function");
});