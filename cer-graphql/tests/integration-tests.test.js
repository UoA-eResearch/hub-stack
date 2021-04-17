const { createTestClient } = require('apollo-server-testing');
const { createServer, getCredentials } = require('../index')
const TQ = require('./test-queries'); // Collection of test queries
const { gql, introspectSchema, ApolloServer } = require('apollo-server');
const { JsonWebTokenError } = require('jsonwebtoken');
const aws = require('aws-sdk');
const aws4 = require('aws4');
const fetch = require('node-fetch');

const TIMEOUT_PERIOD = 40000;
let awsProfile = 'saml';

/**
 * This function creates both the ApolloServer and test client
 * used to make queries against it.
 */
async function createServerAndTestClient() {
    let server = await createServer(getCredentials(true));
    let testServer = createTestClient(new ApolloServer({ ...server, context: () => { } }));
    return testServer;
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

    // creating a new apollo server with authorization baked into the requests
    let authorizedServer = createTestClient(new ApolloServer({
        ...server.config,
        context: () => server.config.context({
            req: {
                headers: {
                    authorization: `Bearer ${tokens['access_token']}`
                }
            }
        })
    }));
    return authorizedServer;
}

/**
 * Gets OAuth tokens from 2FAB Lambda
 */
const getTokens = async () => {
    let deployStage = process.env.stage.trim();
    console.log('Getting AWS credentials for profile ' + awsProfile)
    let awsCreds = new aws.SharedIniFileCredentials({
        profile: awsProfile
    });

    console.log(awsCreds.accessKeyId)
    console.log(awsCreds.expired)

    if (awsCreds.sessionToken === undefined) {
        console.warn('AWS Profile not found, defaulting to saml');
        // falling back to local default profile.
        awsCreds = new aws.SharedIniFileCredentials({
            profile: 'saml',
        });
    }

    let awsLambdaParams;
    console.log('setting 2FAB parameters for ' + deployStage);
    if (deployStage === 'test' || deployStage === 'dev') {
        awsLambdaParams = {
            host: "apigw.test.amazon.auckland.ac.nz",
            path: "/aws-token-grabber/",
            region: "ap-southeast-2",
            service: "execute-api"
        }
    } else {
        awsLambdaParams = {
            host: "apigw.sandbox.amazon.auckland.ac.nz",
            path: "/aws-token-grabber/",
            region: "ap-southeast-2",
            service: "execute-api"
        }
    }

    // Adding the AWS4 Signature to our request parameters
    let opts = {
        host: awsLambdaParams.host,
        path: awsLambdaParams.path,
        region: awsLambdaParams.region,
        service: awsLambdaParams.service,
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
    console.warn({resJson});
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
 * Before any of the tests run, set the aws-profile, and create the query function and make
 * it available within all tests.
 */
beforeAll(async () => {
    // set the aws profile based on the argument passed in
    process.argv.forEach(arg => {
        if (arg.indexOf('--aws-profile') > -1) {
            awsProfile = arg.split('=')[1];
        }
    });

    console.log('AWS Profile set to ' + awsProfile);

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
            variables: { id: '7y4NmxQyIKrsSVmqSew0KJ' }
        });

        expect(res.data.article.title).toEqual('Large Scale Visualisation Facility')
    });

});

describe('Contentful filters (conditionals)', () => {

    test('Can return an article from the articleCollection with a where clause', async function () {
        const ARTICLE_TITLE = 'Large Scale Visualisation Facility';

        let res = await query({
            query: TQ.GET_ARTICLE_BY_WHERE,
            variables: { title: ARTICLE_TITLE }
        });

        expect(res.data.articleCollection.items[0].title).toEqual(ARTICLE_TITLE)
    });

});

describe('Authorization resolvers', () => {

    test('Requesting an articleCollection private field with an invalid Authorization header fails', async function () {
        let { query } = await createServerAndTestClientWithAuth(false);
        let message = false;
        try {
            await query({ query: TQ.GET_ARTICLE_COLLECTION_PRIVATE_WITH_SSO });
        } catch (err) {
            message = err.message;
        }
        expect(message).toBeTruthy();
    }, TIMEOUT_PERIOD);

    test('Requesting an articleCollection private field w/o a header returns an error', async function () {
        let res = await query({ query: TQ.GET_ARTICLE_COLLECTION_PRIVATE });
        expect(res.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
    });

    test('Requesting an articleCollection private field with a valid Authorization header returns data', async function () {
        let { query } = await createServerAndTestClientWithAuth();
        let res = await query({ query: TQ.GET_ARTICLE_COLLECTION_PRIVATE_WITH_SSO });
        expect(res.data.articleCollection).toBeTruthy();
    }, TIMEOUT_PERIOD);

    test('Requesting a article single resource private field returns an error', async function () {
        let res = await query({
            query: TQ.GET_ARTICLE_BY_SYS_ID_PRIVATE,
            variables: { id: 'fRd5opeuTFTvdS12aPjI2' }
        });
        expect(res.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
    });

});