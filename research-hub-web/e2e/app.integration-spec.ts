// import { ResearchHubPage } from './app.po';
// import { browser, by, element, $, $$, ExpectedConditions, ElementFinder, ElementArrayFinder } from 'protractor';
// import { _$, _$$} from './app.e2e-spec';

// import * as aws4 from 'aws4';
// import aws from 'aws-sdk';
const aws4 = require('aws4');
const aws = require('aws-sdk');
const protractor = require('protractor');

// let page: ResearchHubPage;
const TIMEOUT_PERIOD = 65000;

const getAwsCredentials = () => {
  let credentials = new aws.SharedIniFileCredentials({
    profile: 'saml',
  });
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
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br'
  };
  aws4.sign(opts, {
    accessKeyId: awsCreds.accessKeyId,
    secretAccessKey: awsCreds.secretAccessKey,
    sessionToken: awsCreds.sessionToken
  });
  let res = await fetch('https://ef54vsv71a.execute-api.ap-southeast-2.amazonaws.com/sandbox/', opts);
  const resJson = await res.json();
  return resJson;
}

describe('ResearchHub\'s integration functionality', () => {

    it("Returns an authorized page when requested with a valid authorization header", async function() {
       console.log(getTokens());
    })
})