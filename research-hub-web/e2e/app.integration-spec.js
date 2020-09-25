// import { ResearchHubPage } from './app.po';
// import { browser, by, element, $, $$, ExpectedConditions, ElementFinder, ElementArrayFinder } from 'protractor';
// import { _$, _$$} from './app.e2e-spec';

// import * as aws4 from 'aws4';
// import aws from 'aws-sdk';
const aws4 = require('aws4');
const aws = require('aws-sdk');
const protractor = require('protractor');
const fetch = require('node-fetch');

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

  let authTokens; 

  beforeAll(async function() {
    authTokens = await getTokens();
  });

  it("Returns access tokens correctly", async function () {
    // authToken = await getTokens();
    expect(authToken['access_token'].length).toBeGreaterThan(20);
  })

  it("Returns subhub data when ", async function () {
    // let authToken = await getTokens();

  })

  // general request info
  // Request URL: http://localhost:4000/
  // Request Method: POST
  // Status Code: 200 OK
  // Remote Address: [::1]:4000
  // Referrer Policy: strict-origin-when-cross-origin

  // POST / HTTP/1.1
  // Host: localhost:4000
  // Connection: keep-alive
  // Content-Length: 1342
  // Accept: application/json, text/plain, */*
  // Authorization: Bearer eyJraWQiOiJPQUxFMlozMEl4ekNudCsxU0VqTmRYdmIwdElNdm03WUhIZzdWWlNpQUxrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwMDI4ZDFhNi1kYmEwLTQ2OGItYTVmMC04MDVjOGIzMTMxMjEiLCJjb2duaXRvOmdyb3VwcyI6WyJhcC1zb3V0aGVhc3QtMl9wZ0VyanlMNE9fVW9BVGVzdElEUCJdLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Imh0dHBzOlwvXC90ZXN0LWRvbWFpbi5hdWNrbGFuZC5hYy5uelwvbGFtYmRhLWhlbGxvLXdvcmxkIG9wZW5pZCBwcm9maWxlIiwiYXV0aF90aW1lIjoxNjAwMjk3MzQ4LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTJfcGdFcmp5TDRPIiwiZXhwIjoxNjAxMDAyMzQyLCJpYXQiOjE2MDA5OTg3NDIsInZlcnNpb24iOjIsImp0aSI6IjNjYjQ4MzkzLTE5MzMtNDdkMS05YjQ5LTA4ODljYzFmODExMCIsImNsaWVudF9pZCI6IjUzbmozNjNndW1za2VpYmRpcjYxbnUxY3M1IiwidXNlcm5hbWUiOiJ1b2F0ZXN0aWRwX3djb3I2OTAifQ.Mb0ykAEkAyG-Y3PnQyGQ4fvfVxzN-pk29c_Jx2z42WZLaaYlLYcyT5NNFD430MaZPKs3DrNpdAtEy1hhIKqsQlOIFB9oi-jwzSrU8heWRSc4KpXAwyqRGNIVXTc9ZFsEFwqCijrhZjmuKUC9eNtaUb08OMO13u9Qf39tG2rTatPRMNVjeV0P_u6VsGcDtnrDFoklfKFpWFWpbi1UthafhBHRd-YYkyhcR1pXeoHA6-QZDeJSAOsHPOgvV2BnW1J7gCeybGDcauoTK1xDTs02eqeKdhBYrr21w81qHuAQGvmBhR93vgKk5DaKSmIn4mfCAQAlGxYnV0X0YBpbXNXnVg
  // User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36
  // Content-Type: application/json
  // Origin: http://localhost:4200
  // Sec-Fetch-Site: same-site
  // Sec-Fetch-Mode: cors
  // Sec-Fetch-Dest: empty
  // Referer: http://localhost:4200/
  // Accept-Encoding: gzip, deflate, br
  // Accept-Language: en-US,en;q=0.9

  // request payload:
  // {"operationName":"AllSubHubChildPages","variables":{"slug":"engagement"},"query":"query AllSubHubChildPages($slug: String) {\n  subHubCollection(where: {slug: $slug}) {\n    items {\n      slug\n      title\n      summary\n      body {\n        json\n        __typename\n      }\n      ssoProtected\n      searchable\n      subhubPagesCollection {\n        items {\n          ... on Article {\n            __typename\n            slug\n            title\n            ssoProtected\n            summary\n          }\n          ... on CaseStudy {\n            __typename\n            slug\n            title\n            ssoProtected\n            summary\n          }\n          ... on Equipment {\n            __typename\n            slug\n            title\n            ssoProtected\n            summary\n          }\n          ... on OfficialDocuments {\n            __typename\n            title\n            summary\n          }\n          ... on Service {\n            __typename\n            slug\n            title\n            ssoProtected\n            summary\n          }\n          ... on SubHub {\n            __typename\n            slug\n            title\n            ssoProtected\n            summary\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"}

})