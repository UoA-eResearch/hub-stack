const { createTestClient } = require('apollo-server-testing');
const { createServer, getCredentials } = require('../index')
const TQ = require('./test-queries'); // Collection of test queries
const { gql, introspectSchema, ApolloServer } = require('apollo-server');
const { JsonWebTokenError } = require('jsonwebtoken');
const aws = require('aws-sdk');
const aws4 = require('aws4');
const fetch = require('node-fetch');

const TIMEOUT_PERIOD = 20000;

const configResult = require('dotenv').config({ path: '../.env' });
if (configResult.error) {
    throw configResult.error;
}

/**
 * This function creates both the ApolloServer and test client
 * used to make queries against it.
 */
async function createServerAndTestClient() {
    let server = await createServer(getCredentials(true));
    return createTestClient(new ApolloServer({ ...server, context: () => { } }));
}

/**
 * Creates as testing server using the real server's configuration 
 * with an injected context so we can add an authorization header to our query requests.
 * If passed false, will create a query with an valid authorization header.
 */
async function createServerAndTestClientWithAuth(useValidToken = true) {
    let server = await createServer(getCredentials(true));
    let tokens = await getTokens();
    if (!useValidToken) {
        tokens['access_token'] = 'Bearer fake token value';
    }
    return createTestClient(new ApolloServer({
        ...server.config,
        context: () => server.config.context({
            req: {
                headers: {
                    authorization: `Bearer ${tokens['access_token']}`
                }
            }
        })
    }));
}

/**
 * Gets OAuth tokens
 */
const getTokens = async () => {
    let awsCreds = new aws.SharedIniFileCredentials({
        profile: process.env.awsProfile,
    });
    if (awsCreds.sessionToken === undefined) {
        // falling back to local def profile.
        console.log("Couldn't find aws profile matching environment variable awsProfile. Falling back to saml profile for local development.");
        awsCreds = new aws.SharedIniFileCredentials({
            profile: 'saml',
        });
    }

    // Adding the AWS4 Signature to our request parameters
    let opts = {
        host: process.env.OAUTH_LAMBDA_HOST,
        path: process.env.OAUTH_LAMBDA_PATH,
        region: process.env.OAUTH_LAMBDA_REGION,
        service: process.env.OAUTH_LAMBDA_SERVICE,
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br'
    };
    aws4.sign(opts, {
        accessKeyId: awsCreds.accessKeyId,
        secretAccessKey: awsCreds.secretAccessKey,
        sessionToken: awsCreds.sessionToken
    });

    // Making request to 2FAB Lambda using 
    let res = await fetch(`https://${opts.host}${opts.path}`, opts);
    const resJson = await res.json();
    try {
        if (!resJson['access_token']) {
            throw 'Fetching response for OAuth2.0 tokens does not contain access token. You may need to renew locally stored AWS credentials.';
        }
    }
    catch (error) {
        console.error(error);
    }
    return resJson;
}

/**
 * Before any of the tests run create the query function and make
 * it available within all tests.
 */
beforeAll(async () => {
    try {
        return { query } = await createServerAndTestClient();
    } catch (error) {
        fail("An error occurred when trying to setup the server. Have you filled in credentials in the .env file?");
    }
});

describe('Basic collection queries', () => {

    test('Querying the articleCollection searchable fields returns them', async function () {
        let res = await query({ query: TQ.GET_ARTICLE_COLLECTION });

        // Get the fields returned from the first item
        let returned_fields = Object.keys(res.data.articleCollection.items[0]);
        expect(returned_fields).toEqual(TQ.SEARCHABLE_FIELDS)
    });

    test('Querying the equipment collection returns an item with a title', async function () {
        let res = await query({ query: TQ.GET_EQUIPMENT_COLLECTION });
        expect(res.data.equipmentCollection.items[0].title.length).toBeGreaterThan(0)
    });
});

describe('Basic single resource queries', () => {

    test('Can return an individual article by its sys id', async function () {
        let res = await query({
            query: TQ.GET_ARTICLE_BY_SYS_ID,
            variables: { id: 'fRd5opeuTFTvdS12aPjI2' }
        });

        expect(res.data.article.title).toEqual('Test - Top Secret Article')
    });

});

describe('Contentful filters (conditionals)', () => {

    test('Can return an article from the articleCollection with a where clause', async function () {
        const ARTICLE_TITLE = 'Test - First article';

        let res = await query({
            query: TQ.GET_ARTICLE_BY_WHERE,
            variables: { title: ARTICLE_TITLE }
        });

        expect(res.data.articleCollection.items[0].title).toEqual(ARTICLE_TITLE)
    });

});

describe('Authorization resolvers', () => {

    test('Requesting an articleCollection non-public field with an invalid Authorization header fails', async function () {
        let { query } = await createServerAndTestClientWithAuth(false);
        let message = false;
        try {
            await query({ query: TQ.GET_ARTICLE_COLLECTION_PRIVATE_WITH_SSO });
        } catch (err) {
            message = err.message;
        }
        expect(message).toBeTruthy();
    }, TIMEOUT_PERIOD);

    test('Requesting an articleCollection non-public field w/o a header returns an error', async function () {
        let res = await query({ query: TQ.GET_ARTICLE_COLLECTION_PRIVATE });
        expect(res.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
    });

    // test('Requesting an articleCollection non-public field with a valid Authorization header returns data', async function () {
    //     let { query } = await createServerAndTestClientWithAuth();
    //     let res = await query({ query: TQ.GET_ARTICLE_COLLECTION_PRIVATE_WITH_SSO });
    //     expect(res.data.articleCollection).toBeTruthy();
    // }, TIMEOUT_PERIOD);

    // test('Requesting a article single resource non-public field returns an error', async function () {
    //     let res = await query({
    //         query: TQ.GET_ARTICLE_BY_SYS_ID_PRIVATE,
    //         variables: { id: 'fRd5opeuTFTvdS12aPjI2' }
    //     });

    //     expect(res.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
    // });

});