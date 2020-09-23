"use strict";

const mochaPlugin = require("serverless-mocha-plugin");
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper("main", "/handler.js", "main");
const fetch = require('node-fetch');
const aws = require('aws-sdk');
const crypto = require('crypto');
const aws4 = require('aws4');

// Function to return the JSON parsed response body
let getResBody = async (req) =>
  await wrapped.run(req).then((res) => JSON.parse(res.body));

/**
 * Gets yyyy-mm-dd Date
 */
const getAmzDate = () => {
  let date = new Date();
  date.setMilliseconds(0);
  let isoDate = date.toISOString();

  // additional formatting comply with x-amz-date
  isoDate = isoDate.replace('.000', '');
  isoDate = isoDate.replace(/:/g, '');
  isoDate = isoDate.replace(/-/g, '');
  return isoDate;
}

/**
 * Gets the credentials stored locally on file, 
 * assigns them to aws config and returns the credential object.
 */
const getAwsCredentials = () => {
  let credentials = new aws.SharedIniFileCredentials({
    profile: 'saml',
  });
  credentials = credentials;
  return credentials;
}

describe("serverless-now", () => {
  // Example values used for ServiceNow testing
  const EXAMPLE_TICKET_ID = "REQ1216647";
  const EXAMPLE_TICKET_SHORT_DESCRIPTION = "Storage request 123";
  const EXAMPLE_UPI = "skav012";
  const EXAMPLE_SECRET_VALUE = "Welcome to serverless-now from AWS";

  let awsCreds = getAwsCredentials();

  let host = 'ef54vsv71a.execute-api.ap-southeast-2.amazonaws.com';
  let dateStamp = getAmzDate().split('T')[0];
  let amzdate = getAmzDate();
  let service = 'execute-api';
  let region = 'ap-southeast-2';

  let opts = {
    host: host,
    path: '/sandbox/',
    region: 'ap-southeast-2',
    service: service,
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br'
  };
  aws4.sign(opts, {
    accessKeyId: awsCreds.accessKeyId,
    secretAccessKey: awsCreds.secretAccessKey,
    sessionToken: awsCreds.sessionToken
  });
  console.log(JSON.stringify(opts, null, 2));

  fetch('https://ef54vsv71a.execute-api.ap-southeast-2.amazonaws.com/sandbox/', opts).then(res => {
    res.json().then(data => {
      console.log('data received.');
      console.log(data);
    })
  })

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

  // TODO: commenting out until POST requests are working.
  // it("responds to POST requests with a valid body", async () => {
  //   const resBody = await getResBody({
  //     httpMethod: "POST",
  //     body: {
  //       upi: EXAMPLE_UPI,
  //       comment: "Example ticket comment.",
  //     },
  //   });
  //   expect(resBody.object).deep.to.contain({ upi: EXAMPLE_UPI });
  // });

  it("returns a decrypted example secret from AWS parameter store", async () => {
    const resBody = await getResBody({});
    expect(resBody.aws_message).to.equal(EXAMPLE_SECRET_VALUE);
  });

  xit("returns the UPI of the requestor");
  xit("returns an error if an unauthenticated user accesses this function");
});
