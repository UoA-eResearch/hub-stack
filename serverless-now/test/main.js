'use strict';

const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('main', '/handler.js', 'main');

// Function to return the JSON parsed response body
let getResBody = async req => await wrapped.run(req).then(res => JSON.parse(res.body))

describe('serverless-now', () => {

    // Example values used for ServiceNow testing
    const EXAMPLE_TICKET_ID = 'REQ1216647'
    const EXAMPLE_TICKET_SHORT_DESCRIPTION = 'Storage request 123'
    const EXAMPLE_UPI = 'skav012';
    const EXAMPLE_SECRET_VALUE = 'Welcome to serverless-now from AWS';

    it('displays greeting message', async () => {
        const resBody = await getResBody({});
        expect(resBody.message).to.equal('Welcome to serverless-now');
    });

    it('displays a status code 200', async () => {
        const response = await wrapped.run({});
        expect(response.statusCode).to.equal(200);
    });

    it('displays URL query strings back', async () => {
        const resBody = await getResBody({ queryStringParameters: { ticketId: EXAMPLE_TICKET_ID } });
        expect(resBody.number.value).to.equal(EXAMPLE_TICKET_ID);
    })

    it('responds to POST requests', async () => {
        const resBody = await getResBody({
            httpMethod: 'POST',
            body: {
                upi: EXAMPLE_UPI,
                comment: 'Example ticket comment.'
            }
        });

        expect(resBody.object).deep.to.contain({ upi: EXAMPLE_UPI });
    })

    it('returns a decrypted example secret from AWS parameter store', async () => {
        const resBody = await getResBody({});
        expect(resBody.aws_message).to.equal(EXAMPLE_SECRET_VALUE);
    });

    it('returns an example ticket by a hardcoded ticket id', async () => {
        const resBody = await getResBody({ queryStringParameters: { ticketId: EXAMPLE_TICKET_ID } });
        expect(resBody.short_description.value).to.contain(EXAMPLE_TICKET_SHORT_DESCRIPTION);
    });

    xit('returns the UPI of the requestor');
    xit('returns an error if an unauthenticated user accesses this function');
});