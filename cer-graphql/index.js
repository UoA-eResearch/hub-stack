const { ApolloServer, AuthenticationError } = require('apollo-server');
const { introspectSchema, makeRemoteExecutableSchema, mergeSchemas } = require('graphql-tools');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');



// Measure server startup time
var startTime = new Date().getTime();

const getCredentials = (isFromFile) => {
    if (isFromFile) {
        const configResult = require('dotenv').config();
        if (configResult.error) {
            throw configResult.error;
        }
    }
    return {
        CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
        CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
        COGNITO_USER_POOL: process.env.COGNITO_USER_POOL,
        COGNITO_REGION: process.env.COGNITO_REGION
    };
};

// Set up remote schemas
// Load a remote schema and set up the http-link
getRemoteSchema = async (remoteUri) => {
    try {
        console.log('Loading remote schema...')
        const link = new HttpLink({ uri: remoteUri, fetch });
        const schema = await introspectSchema(link);

        console.log('Remote schema loaded successfully.')
        return makeRemoteExecutableSchema({
            schema,
            link,
        });
    } catch (e) {
        console.error(e);
    }
}

const fetchCognitoPublicKeys = async (jwkUrl) => {
    try {
        return fetch(jwkUrl).then((response) => {
            if (!response.ok) {
                throw new Error("Could not reach Cognito public keys URL.");
            }
            const jwk = response.json();
            console.log("Cognito public keys loaded successfully.");
            return jwk;
        });
    } catch (e) {
        console.error(e);
    }
}

const verifyJwt = (token, jwk) => {
    const decodedJwt = jwt.decode(token, { complete: true });
    const key = jwk.keys.find(key => {
        return key.kid === decodedJwt.header.kid
    });
    if (!key) {
        throw new Error("Signing key for token not found in Cognito public keys.");
    }
    const pem = jwkToPem(key);
    return jwt.verify(token, pem);
};

// Set up the schemas and initialize the server
async function createServer(config) {

    const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID, COGNITO_REGION, COGNITO_USER_POOL } = config;

    // Load remote schemas here
    contentfulSchema = await getRemoteSchema(`https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}?access_token=${CONTENTFUL_ACCESS_TOKEN}`);

    // Load Cognito public keys in order to verify tokens.
    const cognitoPublicKeysUrl = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL}/.well-known/jwks.json`,
        cognitoPublicKeys = await fetchCognitoPublicKeys(cognitoPublicKeysUrl);

    // Get a list of the types that have the ssoProtected field
    let protectedTypes = Object.keys(contentfulSchema._typeMap)
        .filter(x => x.includes('Filter')) // Get all the filters
        .filter(y => contentfulSchema._typeMap[y]._fields.ssoProtected) // Filter by those with an ssoProtected field
        .flatMap(z => [z.replace('Filter', ''), z.replace('Filter', 'Collection')]) // Replace 'xfilter' with 'x' and 'xCollection'
        .map(a => a[0].toLowerCase() + a.substring(1)); // Make first char lower case

    let customQueryResolvers = {};

    // Loop over the protected types and create custom resolvers for them
    protectedTypes.forEach(type => {
        customQueryResolvers[type] = (root, args, context, info) => {
            if (context.user) { // If the user is signed in, simply forward request
                return forwardReqToContentful(args, context, info);
            } else { // If the user is not signed, do further request checking

                /**
                 * Get list of requested fields. The location of these differs depending on whether
                 * this is the resolver for a collection or a single resource.
                 */
                let requestedFields = (info.fieldName.endsWith('Collection') ?
                    info.fieldNodes[0].selectionSet.selections[0].selectionSet.selections :
                    info.fieldNodes[0].selectionSet.selections)
                    .map(x => x.name.value);

                // GraphQL introspection fields, these are used by GraphQL to query metadata
                const GRAPHQL_INTROSPECTION_FIELDS = [
                    '__Schema',
                    '__Type',
                    '__TypeKind',
                    '__typename',
                    '__Field',
                    '__InputValue',
                    '__EnumValue',
                    '__Directive'
                ];

                // Check whether the user has requested only public fields
                const ALWAYS_PUBLIC_FIELDS = [
                    'title',
                    'summary',
                    'name',
                    'ssoProtected',
                    'searchable',
                    ...GRAPHQL_INTROSPECTION_FIELDS
                ];

                /**
                 * Check if the query contains any fragments. If so, get the names of all
                 * of the fragments. These will be permitted along with our ALWAYS_PUBLIC_FIGURES
                 */
                let fragmentNames = Object.keys(info.fragments);

                // Variable to store the fields reque
                let fragmentsFields = [];

                //  Get all of the fields requested by all of the fragments
                if (!!fragmentNames.length) { // If the query contains fragments
                    fragmentNames.forEach(fragmentName => { // Loop through each fragment
                        fragmentsFields = [...fragmentsFields, // Add fragments fields to the all fragments fields array
                        ...info.fragments[fragmentName].selectionSet.selections
                            .filter(x => x.kind === 'InlineFragment')
                            .flatMap(y => y.selectionSet.selections)
                            .map(z => z.name.value)
                        ]
                    });
                }

                /**
                 * Check whether the user is only querying public fields, or fragment names.
                 * This also checks the fields within all fragments.
                 */
                let userOnlyQueryingPublicFields = [...requestedFields, ...fragmentsFields]
                    .every(y => [...ALWAYS_PUBLIC_FIELDS, ...fragmentNames].includes(y));

                // Log any non-public fields the user is requesting
                if (!userOnlyQueryingPublicFields) {
                    console.log('User requested non-public field(s):',
                        [...requestedFields, ...fragmentsFields]
                            .filter(y => ![...ALWAYS_PUBLIC_FIELDS, ...fragmentNames].includes(y)));
                }

                // If the user is only querying public fields, forward the request on to Contentful
                if (userOnlyQueryingPublicFields) return forwardReqToContentful(args, context, info);

                /**
                 * If the user hasn't requested fields that can only ever be public, then check whether they have
                 * included the ssoProtected field. If they haven't throw an auth error. If they have, the 
                 * response is then intercepted and only returned if none of the results have an 'ssoProtected: true'
                 * field. This is done in the server formatResponse() function.
                 */
                if (!(requestedFields.includes('ssoProtected')))
                    return new AuthenticationError('The ssoProtected field is required to query this content.');

                context.responseVerificationRequired = true;
                return forwardReqToContentful(args, context, info);
            }
        }
    })

    // Function used in resolvers to forward requests on to Contentful
    let forwardReqToContentful = (args, context, info) =>
        info.mergeInfo.delegateToSchema({
            schema: contentfulSchema,
            operation: 'query',
            fieldName: info.fieldName,
            args,
            context,
            info
        });

    // Merge all schemas (remote and local) here
    const schema = mergeSchemas({
        schemas: [
            contentfulSchema,
        ],
        resolvers: [{ Query: customQueryResolvers }],
    });

    return new ApolloServer({
        schema,
        context: ({ req }) => {
            // Log incoming queries
            // if (req && req.body && (req.body.operationName != 'IntrospectionQuery'))
            // console.log('\n===== Query Recieved: ======\n', req.body.query)

            // Verify the requestor's token and return their user info, or return null for unauthenticated users
            try {
                return { user: verifyJwt(req.headers.authorization.substring('Bearer '.length), cognitoPublicKeys) }
            } catch (e) { return null }
        }, formatResponse: (res, context) => {

            // Log the requestor's username or 'Unauthenticated'
            if (context.operationName != 'IntrospectionQuery')
                console.log(`User: ${context.context.user ? context.context.user.username.split('_')[1] : 'Unauthenticated'}`)
            /**
             * If the user is not signed in and the responseVerificationRequired flag is
             * true (i.e. they requested potentially non-public information), check the response
             * for the existence of any 'ssoProtected: true' fields.
             */
            if (context.operationName != 'IntrospectionQuery'
                && !(!!context.context.user)
                && context.context.responseVerificationRequired) {

                if (JSON.stringify(res).includes('\"ssoProtected\":true'))
                    throw new AuthenticationError('SSO authentication required to view this content.')
            }
        },
    });
};

// If the file is being called directly instead of being required as a module.
if (require.main === module) {
    (async () => {
        // Create the ApolloServer object
        const isConfigFromFile = process.argv.includes("--config-from-file")
        let config;
        try {
            config = getCredentials(isConfigFromFile);
        } catch (error) {
            console.error("Could not load credentials from file. Make sure you have filled in credentials in the .env file, or try running the server without --config-from-file.");
            process.exit(1);
        }
        // Check if access token and space ID are supplied.
        if (!config.CONTENTFUL_ACCESS_TOKEN || !config.CONTENTFUL_SPACE_ID ||
            !config.COGNITO_REGION || !config.COGNITO_USER_POOL) {
            console.error("Contentful and/or Cognito values not supplied. Please set environment variables CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID, COGNITO_REGION and COGNITO_USER_POOL.");
            process.exit(1);
        }

        let server = await createServer(config);

        // The 'listen' method launches a web server.
        server.listen().then(({ url }) => {
            console.log(`🚀  Content API server ready at ${url}. Server started in: ${new Date().getTime() - startTime}ms.`);
        });
    })();
}

// Export the createServer function to be used in e2e tests
exports.createServer = createServer;
exports.getCredentials = getCredentials;