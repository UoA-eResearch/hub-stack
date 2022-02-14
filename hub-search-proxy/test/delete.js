'use strict';
const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('delete', '/handler.js', 'delete');

describe('delete', () => {
  before((done) => {
    done();
  });

  it('DELETE request with no id returns a 500 response', async () => {
    const response = await wrapped.run({
      httpMethod: "DELETE"
    });

    expect(response).to.not.be.empty;
    expect(response.statusCode).to.equal(500);
  });
});