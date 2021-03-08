const { ApolloServer, AuthenticationError } = require('apollo-server');
const { introspectSchema, makeRemoteExecutableSchema, mergeSchemas } = require('graphql-tools');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

// Measure server startup time
var startTime = new Date().getTime(); 

const getCredentials = (isFromFile) => {
    // isFromFile determines where we load the credentials from.
    // If true we load from the .env file in the folder. 
    // If false, we load from environment variables.
    if (isFromFile) {
        const configResult = require('dotenv').config({path: '../.env'});
        if (configResult.error) {
            throw configResult.error;
        }
    }
    let isPreviewEnv = false;
    if (process.env.IS_PREVIEW_ENV !== undefined) {
        isPreviewEnv = process.env.IS_PREVIEW_ENV === "true";
    }
    return {
        CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
        CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
        COGNITO_USER_POOL: process.env.COGNITO_USER_POOL,
        COGNITO_REGION: process.env.COGNITO_REGION,
        IS_PREVIEW_ENV: isPreviewEnv
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

    const { CONTENTFUL_ACCESS_TOKEN,
            CONTENTFUL_SPACE_ID,
            COGNITO_REGION,
            COGNITO_USER_POOL,
            IS_PREVIEW_ENV
        } = config;

    // Load remote schemas here
    contentfulSchema = await getRemoteSchema(`https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}` +
        `/environments/master?access_token=${CONTENTFUL_ACCESS_TOKEN}`);

    // Load Cognito public keys in order to verify tokens.
    const cognitoPublicKeysUrl = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL}` +
        "/.well-known/jwks.json",
        cognitoPublicKeys = await fetchCognitoPublicKeys(cognitoPublicKeysUrl); 

    // Get a list of the types that have the ssoProtected field
    let protectedTypes = Object.keys(contentfulSchema._typeMap)
        .filter(x => x.includes('Filter')) // Get all the filters
        .filter(x => !x.startsWith('cf')) // Filter out Contentful's special cf* filters
        .filter(y => contentfulSchema._typeMap[y]._fields.ssoProtected) // Filter by those with an ssoProtected field
        .flatMap(z => [z.replace('Filter', ''), z.replace('Filter', 'Collection')]) // Replace 'xfilter' with 'x' and 'xCollection'
        .map(a => a[0].toLowerCase() + a.substring(1)); // Make first char lower case

    let customQueryResolvers = {};

    // Loop over the protected types and create custom resolvers for them
    protectedTypes.forEach(type => {
        customQueryResolvers[type] = (root, args, context, info) => {
            if (IS_PREVIEW_ENV) {
                // Add preview as a query argument if we are in a preview
                // environment.
                args.preview = true;
            }
            if (context.user) { // If the user is signed in, simply forward request
                return forwardReqToContentful(args, context, info);
            } else { // If the user is not signed, do further request checking

                if (IS_PREVIEW_ENV) {
                    throw new AuthenticationError('You must sign in to SSO before accessing preview API.');
                }
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
                    'linkedFrom',
                    'slug',
                    'banner',
                    'icon',
                    'viewType',
                    ...GRAPHQL_INTROSPECTION_FIELDS
                ];

                var requestedFields = []; // List of fields requested, populated in the recursive function below

                let recursive_iteration_count = 0; // Tracks the number of recursive iterations
                const MAX_RECURSIVE_ITERATIONS = 2000; // The maximum allowed number of recursive iterations
                var getRequestedFields = function (obj) {
                    recursive_iteration_count++;
                    if (recursive_iteration_count > MAX_RECURSIVE_ITERATIONS) {
                        throw new Error('Max recursive iterations exceeded when checking for field names.');
                    }
                    if (Array.isArray(obj)) { // If the object is an array
                        for (let x of obj) {
                            getRequestedFields(x); // Call the function recursively only each element in the array
                        }
                    } else { // Else it's an object
                        if (obj.kind && obj.kind == 'Field' && obj.name.value != 'items' && !obj.name.value.includes('Collection')) {
                            //  Throw an error if they have tried to alias the ssoProtected result
                            if (obj.name.value === 'ssoProtected' && !!obj.alias) {
                                throw new AuthenticationError('Aliasing the ssoProtected field is forbidden');
                            }
                            requestedFields.push(obj.name.value); // *Add it to the array if it's valid (and not a collection/items)
                        }
                        for (let key in obj) { // Loop over all the properties in this object
                            if (Array.isArray(obj[key]) && obj[key].length != 0) { // If this property is an array, return it
                                getRequestedFields(obj[key]);
                            } else { // Else this property is an object, check if it's valid
                                if (!Array.isArray(obj[key]) && !!obj[key] && typeof (obj[key]) == 'object' && obj[key] != {}) {
                                    if (obj[key].kind && obj[key].kind != 'Name') {
                                        getRequestedFields(obj[key]); // If so, call the function recursively on it
                                    }
                                }
                            }
                        }
                    }
                }

                getRequestedFields(info.fieldNodes[0].selectionSet.selections); // Call the recursive function, populating the requestedFields array.
                console.log({ requestedFields: requestedFields })

                userOnlyQueryingPublicFields = requestedFields.every(y => ALWAYS_PUBLIC_FIELDS.includes(y));
                console.log('User only querying public fields?', userOnlyQueryingPublicFields);

                // Log any non-public fields the user is requesting
                if (!userOnlyQueryingPublicFields) {
                    console.log('User requested non-public field(s):',
                        requestedFields
                            .filter(y => !ALWAYS_PUBLIC_FIELDS.includes(y)));
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
            if (req && req.body && (req.body.operationName != 'IntrospectionQuery'))
                console.log('\n===== Query Recieved: ======\n', req.body.query)

            // Verify the requestor's token and return their user info, or return null for unauthenticated users
            try {
                return { user: verifyJwt(req.headers.authorization.substring('Bearer '.length), cognitoPublicKeys) }
            } catch (e) { 
                return null;
            }
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
            console.error("Could not load credentials from file. Make sure you have filled in credentials in the .env file," +
                "or try running the server without --config-from-file.");
            process.exit(1);
        }
        if (config.IS_PREVIEW_ENV) {
            console.log("Running in preview environment, will request draft content from Contentful.");
        }
        // Check if access token and space ID are supplied.
        if (!config.CONTENTFUL_ACCESS_TOKEN || !config.CONTENTFUL_SPACE_ID ||
            !config.COGNITO_REGION || !config.COGNITO_USER_POOL) {
            console.error("Contentful and/or Cognito values not supplied. Please set environment variables CONTENTFUL_ACCESS_TOKEN," +
                "CONTENTFUL_SPACE_ID, COGNITO_REGION and COGNITO_USER_POOL.");
            process.exit(1);
        }

        try {
            let server = await createServer(config);

            // The 'listen' method launches a web server.
            server.listen().then(({ url }) => {
                console.log(`🚀  Content API server ready at ${url}. Server started in: ${new Date().getTime() - startTime}ms.`);
            });
        } catch(error) { console.log('Error creating server object and getting it to listen: ', error) }
    })();
}

// Export the createServer function to be used in e2e tests
exports.createServer = createServer;
exports.getCredentials = getCredentials;