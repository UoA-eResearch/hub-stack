const { createTestClient } = require('apollo-server-testing');
const { createServer, getCredentials } = require('../index')
const TQ = require('./test-queries'); // Collection of test queries
const { gql, introspectSchema, ApolloServer } = require('apollo-server');
const { JsonWebTokenError } = require('jsonwebtoken');
const aws = require('aws-sdk');
const aws4 = require('aws4');
const fetch = require('node-fetch');

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
 */
async function createServerAndTestClientWithAuth() {
    let server = await createServer(getCredentials(true));
    let tokens = await getTokens();
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
    let awsCreds;
    try {
        awsCreds = new aws.SharedIniFileCredentials({
            profile: process.env.awsProfile,
        });
    } catch (error) {
        console.error("Could not retrieve AWS credentials. Try re-running the credential python script.");
    }

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
    try {
        if (!resJson['access_token']) {
            throw 'Fetching response for OAuth2.0 tokens does not contain access token.';
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

    test('Querying the equipment collection returns the correct first item', async function () {
        let res = await query({ query: TQ.GET_EQUIPMENT_COLLECTION });
        expect(res.data.equipmentCollection.items[0].title).toEqual('Death Star')
    });
});

describe('Basic single resource queries', () => {

    test('Can return an individual article by its sys id', async function () {
        let res = await query({
            query: TQ.GET_ARTICLE_BY_SYS_ID,
            variables: { id: 'fRd5opeuTFTvdS12aPjI2' }
        });

        expect(res.data.article.title).toEqual('Top Secret Article')
    });

});

describe('Contentful filters (conditionals)', () => {

    test('Can return an article from the articleCollection with a where clause', async function () {
        const ARTICLE_TITLE = 'First article';

        let res = await query({
            query: TQ.GET_ARTICLE_BY_WHERE,
            variables: { title: ARTICLE_TITLE }
        });

        expect(res.data.articleCollection.items[0].title).toEqual(ARTICLE_TITLE)
    });

});

describe('Authorisation resolvers', () => {

    test('Requesting an articleCollection non-public field w/o a header returns an error', async function () {
        let res = await query({ query: TQ.GET_ARTICLE_COLLECTION_PRIVATE });
        expect(res.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
    });

    test('Requesting an articleCollection non-public field with a valid Authorization header returns an response', async function () {
        let { query } = await createServerAndTestClientWithAuth();
        let res = await query({ query: TQ.GET_ARTICLE_COLLECTION_PRIVATE_WITH_SSO });
        expect(res.data.articleCollection).toBeTruthy();
    }, 20000);

    test('Requesting a article single resource non-public field returns an error', async function () {
        let res = await query({
            query: TQ.GET_ARTICLE_BY_SYS_ID_PRIVATE,
            variables: { id: 'fRd5opeuTFTvdS12aPjI2' }
        });

        expect(res.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
    });

});