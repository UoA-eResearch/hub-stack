'use strict';
const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('update', '/handler.js', 'update');

describe('update', () => {
  before((done) => {
    done();
  });

  it('PUT request with no id returns a 500 response', async () => {
    const response = await wrapped.run({
      httpMethod: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: ""
    });

    expect(response).to.not.be.empty;
    expect(response.statusCode).to.equal(500);
  });
});
