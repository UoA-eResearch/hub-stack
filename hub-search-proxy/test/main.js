"use strict";
const mochaPlugin = require("serverless-mocha-plugin");
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper("main", "/handler.js", "search");
const TIMEOUT_PERIOD = 20000;

let getResBody = async (req) => 
  await wrapped.run(req).then(res => JSON.parse(res.body));

describe("search", () => {
  const query = "Tis better to have tested and lost than never to have tested at all";

  it("POST search request returns a response", async function () {   
    this.timeout(TIMEOUT_PERIOD);

    const resBody = await getResBody({
      httpMethod: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        sort: "relevance",
        includeContentTypes: []
      })
    });
    
    expect(resBody.query).to.contain(query);
    expect(resBody.result.hits.total.value).to.exist;
  });

  it("POST search request with invalid sort option returns an error", async function () {    
    this.timeout(TIMEOUT_PERIOD);

    const resBody = await getResBody({
      httpMethod: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        sort: "invalid"
      })
    });

    expect(resBody.result).to.contain("Error: Sort options are A-Z, Z-A, or relevance.");
  });

  it("POST search request with invalid content type option returns an error", async function () {    
    this.timeout(TIMEOUT_PERIOD);

    const resBody = await getResBody({
      httpMethod: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        includeContentTypes: ["invalid"]        
      })
    });

    expect(resBody.result).to.contain("Error: Received invalid content type");
  });
});