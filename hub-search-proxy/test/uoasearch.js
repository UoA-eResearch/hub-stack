"use strict";
const mochaPlugin = require("serverless-mocha-plugin");
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper("uoasearch", "/uoasearch.js", "search");
const TIMEOUT_PERIOD = 20000;

let getResBody = async (req) => 
  await wrapped.run(req).then(res => JSON.parse(res.body));

describe("hub-search-proxy uoasearch", () => {
  const query = "Hello darkness my old friend";

  it("POST uoasearch request returns a response", async function () {
    this.timeout(TIMEOUT_PERIOD);
    
    const resBody = await getResBody({
      httpMethod: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    });
    
    expect(resBody.query).to.contain(query);
    expect(resBody.result.info.page.total_result_count).to.exist;
    expect(resBody.result.errors).to.be.empty;
  });

  it("POST uoasearch request with invalid sort option returns an error", async function () {    
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
});