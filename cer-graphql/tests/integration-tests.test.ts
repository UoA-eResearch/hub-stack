import { createServer, getCredentials } from "../server";
import * as TQ from './test-queries'; // Collection of test queries
import aws from 'aws-sdk';
import fetch from "node-fetch";
import { AddressInfo } from "net";
// This package does not have type declarations.
const aws4 = require('aws4');

const TIMEOUT_PERIOD = 40000;
let awsProfile = 'saml';

/**
 * This function creates both the server and a test client
 * used to make queries against it.
 * The test client is a simple fetch function that asks for a JSON response. 
 */
async function createServerAndTestClient() {
    let server = (await createServer(getCredentials(true))).listen();
    const addrInfo = server.address() as AddressInfo;
    const addr = `http://localhost:${addrInfo.port}`;
    return {
        query: (q: object) => (
            fetch(addr, {
                method: "POST",
                body: JSON.stringify(q),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                return res.json();
            })
        ),
        close: () => {
            server.close();
        }
    }
};

/**
 * Creates as testing server using the real server's configuration 
 * with an injected context so we can add an authorization header to our query requests.
 * If passed false, will create a query with an valid authorization header.
 */
async function createServerAndTestClientWithAuth(useValidToken = true) {
    let server = (await createServer(getCredentials(true))).listen();
    const addrInfo = server.address() as AddressInfo;
    const addr = `http://localhost:${addrInfo.port}`;
    let tokens = await getTokens();
    if (!useValidToken) {
        tokens['access_token'] = 'Bearer fake token value';
    }

    return {
        query: (q: object) => (
            fetch(addr, {
                method: "POST",
                body: JSON.stringify(q),
                headers: {
                    authorization: `Bearer ${tokens["access_token"]}`,
                    "Content-Type": "application/json"
                }
            }).then(res => {
                return res.json();
            })
        ),
        close: () => {
            server.close();
        }
    };
}

/**
 * Gets OAuth tokens from 2FAB Lambda
 */
const getTokens = async () => {
    let deployStage = process.env.stage?.trim();
    console.log('Getting AWS credentials for profile ' + awsProfile)
    let awsCreds = new aws.SharedIniFileCredentials({
        profile: awsProfile
    });

    if (awsCreds.sessionToken === undefined) {
        console.warn('AWS Profile not found, defaulting to saml');
        // falling back to local default profile.
        awsCreds = new aws.SharedIniFileCredentials({
            profile: 'saml',
        });
    }

    let awsLambdaParams;
    console.log('setting 2FAB parameters for ' + deployStage);
    if (deployStage === 'sandbox') {
        awsLambdaParams = {
            host: "apigw.sandbox.amazon.auckland.ac.nz",
            path: "/aws-token-grabber/",
            region: "ap-southeast-2",
            service: "execute-api"
        }
    } else {
        awsLambdaParams = {
            host: "apigw.test.amazon.auckland.ac.nz",
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
    const fetchOpts = aws4.sign(opts, {
        accessKeyId: awsCreds.accessKeyId,
        secretAccessKey: awsCreds.secretAccessKey,
        sessionToken: awsCreds.sessionToken
    });

    // Making request to 2FAB Lambda using 
    let res = await fetch(`https://${opts.host}${opts.path}`, fetchOpts);
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

describe("Tests for cer-graphql", () => {
    /**
     * Before any of the tests run, set the aws-profile, and create the query function and make
     * it available within all tests.
     */
    let query : Function;
    let closeServer: Function;
    beforeAll(async () => {
        // set the aws profile based on the argument passed in
        process.argv.forEach(arg => {
            if (arg.indexOf('--aws-profile') > -1) {
                awsProfile = arg.split('=')[1];
            }
        });

        console.log('AWS Profile set to ' + awsProfile);

        try {
            const client = await createServerAndTestClient();
            query = client.query;
            closeServer = client.close;
        } catch (error) {
            fail("An error occurred when trying to setup the server. Have you filled in credentials in the .env file?");
        }
    });

    afterAll(() => {
        // End the server being tested.
        closeServer();
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
            let { query, close } = await createServerAndTestClientWithAuth(false);
            try {
                let message = false;
                let res = await query({ query: TQ.GET_ARTICLE_COLLECTION_PRIVATE_WITH_SSO });
                message = res.errors[0];
                expect(message).toBeTruthy();
            } finally {
                // stop the server
                close();
            }
        }, TIMEOUT_PERIOD);

        test('Requesting an articleCollection private field w/o a header returns an error', async function () {
            let res = await query({ query: TQ.GET_ARTICLE_COLLECTION_PRIVATE });
            expect(res.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
        });

        test("Requesting an articleCollection private field in a fragment w/o a header returns an error", async function() {
            let res = await query({ query: TQ.GET_ARTICLE_COLLECTION_PRIVATE_FRAGMENT});
            expect(res.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
        });

        test("Requesting an article private field that is deeply-nested w/o a header returns an error", async function() {
            let res = await query({ query: TQ.GET_ARTICLE_COLLECTION_NESTED_PROTECTED_FIELD});
            expect(res.errors[0].extensions.code).toEqual("UNAUTHENTICATED");
        });

        test("Aliasing the ssoProtected field should not be permitted without logging in", async function() {
            let res = await query ({
                query: TQ.ALIASING_SSOPROTECTED_QUERY
            });
            expect(res.errors.length).toBeGreaterThan(0);
            expect(res.errors[0].extensions.code).toBe("UNAUTHENTICATED");
            expect(res.data).toBeFalsy();
        });

        test('Requesting an articleCollection private field with a valid Authorization header returns data', async function () {
            let { query, close } = await createServerAndTestClientWithAuth();
            try {
                let res = await query({ query: TQ.GET_ARTICLE_COLLECTION_PRIVATE_WITH_SSO });
                expect((res as any).data.articleCollection).toBeTruthy();
            } finally {
            // stop the server
                close();
            }
        }, TIMEOUT_PERIOD);

        test('Requesting a article single resource private field returns an error', async function () {
            let res = await query({
                query: TQ.GET_ARTICLE_BY_SYS_ID_PRIVATE,
                variables: { id: 'fRd5opeuTFTvdS12aPjI2' }
            });
            expect(res.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
        });

        test("Requesting a subhubCollection with nested public field (including the items field) returns data", async function() {
            let res = await query({
                query: TQ.GET_SUBHUB_COLLECTION_NESTED_ITEMS_FIELD
            });
            expect((res as any).data.subHubCollection).toBeTruthy();
        });

    });
});