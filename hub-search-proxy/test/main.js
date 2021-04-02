"use strict";
const mochaPlugin = require("serverless-mocha-plugin");
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper("main", "/handler.js", "search");
const fetch = require('node-fetch');
const aws = require('aws-sdk');
const aws4 = require('aws4');
const TIMEOUT_PERIOD = 20000;

let getResBody = async (req) => 
  await wrapped.run(req).then(res => JSON.parse(res.body));

describe("hub-search-proxy", () => {
  it("POST search request returns a response", async function () {
    this.timeout(TIMEOUT_PERIOD);
    const query = "Tis better to have tested and lost than never to have tested at all";
    
    const resBody = await getResBody({
      httpMethod: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    });

    if (resBody.result.hasOwnProperty("name") && resBody.result.name === "ResponseError") {
      console.log(JSON.stringify(resBody.result));
    }
    
    expect(resBody.query).to.contain(query);
  });
});