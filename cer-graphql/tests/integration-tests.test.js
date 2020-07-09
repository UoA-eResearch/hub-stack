const { createTestClient } = require('apollo-server-testing');
const { createServer } = require('../index')
const TQ = require('./test-queries'); // Collection of test queries
const { gql, introspectSchema } = require('apollo-server')

async function constructTestServer() {

    // Create the e2e server 
    let server = await createServer();

    // Create the query function
    const { query } = createTestClient(server);

    let res = await query({ query: TQ.GET_SUBHUB_COLLECTION });

    console.log(JSON.stringify(res))
}

// Initialise the main (async) function
constructTestServer();
