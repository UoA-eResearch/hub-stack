const { createTestClient } = require('apollo-server-testing');
const { createServer, getCredentials } = require('../index')
const TQ = require('./test-queries'); // Collection of test queries
const { gql, introspectSchema } = require('apollo-server');
const { JsonWebTokenError } = require('jsonwebtoken');

/**
 * This function creates both the ApolloServer and test client
 * used to make queries against it.
 */
async function createServerAndTestClient() {
    let server = await createServer(getCredentials(true));
    return createTestClient(server);    
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

    test('Requesting a article single resource non-public field returns an error', async function () {
        let res = await query({
            query: TQ.GET_ARTICLE_BY_SYS_ID_PRIVATE,
            variables: { id: 'fRd5opeuTFTvdS12aPjI2' }
        });

        expect(res.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
    });
});