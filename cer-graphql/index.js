const { ApolloServer, AuthenticationError, introspectSchema, makeRemoteExecutableSchema, mergeSchemas } = require('apollo-server');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const { validateUnauthenticatedQuery } = require("./build/executeQuery");
const { validate } = require('graphql');
const assertResultsArePublicItems = require('./build/assertResultsArePublicItems');

// Measure server startup time
var startTime = new Date().getTime(); 

/**
 * Deletes environment variables we expect to use as existing env vars dont get overwritten.
 */
const deleteEnvironmentVariables = () => {
    delete process.env.CONTENTFUL_ACCESS_TOKEN;
    delete process.env.CONTENTFUL_SPACE_ID;
    delete process.env.COGNITO_USER_POOL; 
    delete process.env.COGNITO_REGION; 
}

/**
 * Conditionally loads environment variables from an environment file returns object with env values.
 * @param {*} isFromFile Whether or not to load the .env file
 * @returns void
 */
const getCredentials = (isFromFile) => {
    // isFromFile determines where we load the credentials from.
    // If true we load from the .env file in the folder. 
    // If false, we load from environment variables.
    if (isFromFile) {
        deleteEnvironmentVariables();
        let path;
        switch(process.env.stage) {
            case 'dev':
                path = '../.env';
                break;
            case 'test':
                path = '../.test.env';
                break;
            default:
                path = '../.env';
                break;
        }

        const configResult = require('dotenv').config({path});
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
        CONTENTFUL_ENVIRONMENT_ID: process.env.CONTENTFUL_ENVIRONMENT_ID,
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
    if (!decodedJwt) {
        throw new Error("Invalid token.");
    }
    const key = jwk.keys.find(key => {
        return key.kid === decodedJwt.header.kid
    });
    if (!key) {
        throw new Error("Signing key for token not found in Cognito public keys.");
    }
    const pem = jwkToPem(key);
    return jwt.verify(token, pem);
};

function getProtectedTypes(schema) {
    const typeMap = schema.getTypeMap();
  
    return Object.keys(typeMap)
        .filter(x => x.includes('Filter')) // Get all the filters
        .filter(x => !x.startsWith('cf')) // Filter out Contentful's special cf* filters
        .filter(y => { // Filter by those with an ssoProtected field
          const type = typeMap[y];
          // First check this type has its own nested fields, before seeing if it has a ssoProtected field.
          return "getFields" in type && type.getFields()["ssoProtected"]; 
        })
        .flatMap(z => [z.replace('Filter', ''), z.replace('Filter', 'Collection')]) // Replace 'xfilter' with 'x' and 'xCollection'
        .map(a => a[0].toLowerCase() + a.substring(1)); // Make first char lower case
  }


// Set up the schemas and initialize the server
async function createServer(config) {

    const { CONTENTFUL_ACCESS_TOKEN,
            CONTENTFUL_ENVIRONMENT_ID,
            CONTENTFUL_SPACE_ID,
            COGNITO_REGION,
            COGNITO_USER_POOL,
            IS_PREVIEW_ENV
        } = config;

    // Load remote schemas here
    contentfulSchema = await getRemoteSchema(`https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}` +
        `/environments/${CONTENTFUL_ENVIRONMENT_ID}?access_token=${CONTENTFUL_ACCESS_TOKEN}`);

    // Load Cognito public keys in order to verify tokens.
    const cognitoPublicKeysUrl = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL}` +
        "/.well-known/jwks.json",
        cognitoPublicKeys = await fetchCognitoPublicKeys(cognitoPublicKeysUrl); 

    // Get a list of the types that have the ssoProtected field
    let protectedTypes = getProtectedTypes(contentfulSchema); // Make first char lower case

    let customQueryResolvers = {};

    // Loop over the protected types and create custom resolvers for them
    protectedTypes.forEach(type => {
        customQueryResolvers[type] = (root, args, context, info) => {
            if (IS_PREVIEW_ENV) {
                // Add preview as a query argument if we are in a preview
                // environment.
                args.preview = true;
            }
            return forwardReqToContentful(args, context, info);
        }
    });

    customQueryResolvers['personCollection'] = (root, args, context, info) => {
        if (IS_PREVIEW_ENV) {
            // Add preview as a query argument if we are in a preview
            // environment.
            args.preview = true;
        }
        if (context.user) { // If the user is signed in, simply forward request
            return forwardReqToContentful(args, context, info);
        } else { // If the user is not signed in they shouldn't be allowed to request the personCollection
            return new AuthenticationError('You cannot query the personCollection unless authenticated.');
        }
    }

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

    const enablePlayground = CONTENTFUL_ENVIRONMENT_ID === 'dev' ? true : false;

    return new ApolloServer({
        schema,
        introspection: true,
        playground: enablePlayground,
        context: ({ req }) => {
            // Log incoming queries
            if (req && req.body && (req.body.operationName != 'IntrospectionQuery'))
                console.log('\n===== Query Recieved: ======\n', req.body.query)

            // Verify the requestor's token and return their user info, or return null for unauthenticated users
            // In preview environment, always stop further query as we require sign in first.
                const authorization = req.headers.authorization;
                if (!authorization || 
                    (typeof authorization === "string" && 
                    !authorization.startsWith("Bearer "))) {
                    // Check if the authorization header exists and has a bearer token.
                    // If not, return null
                    if (IS_PREVIEW_ENV) {
                        // Reject all non-logged in queries in preview environment
                        console.log("No bearer token sent. In preview environment, so returning AuthenticationError.");
                        throw new AuthenticationError('You must sign in to SSO before accessing preview API.');
                    }
                    return null;
                }
            try {
                return { user: verifyJwt(authorization.substring('Bearer '.length), cognitoPublicKeys) }
            } catch (e) { 
                // Could not verify the user.
                console.error("Error while verifying JWT", e);
                if (IS_PREVIEW_ENV) {
                    // Reject all non-logged in queries in preview environment
                    console.log("Exception thrown while verifying user token. In preview environment, so returning AuthenticationError.\n", e)
                    throw new AuthenticationError('You must sign in to SSO before accessing preview API.');
                }
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
                && !context.context.user) {
                const verificationRequired = validateUnauthenticatedQuery(context.document, context.schema, new Set(protectedTypes));
                if (verificationRequired) {
                    assertResultsArePublicItems(res);
                }
            }
        },  formatError: (err) => {
            // Print out errors so they can be searched in logs.
            console.error(err);
            return err;
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
            !config.COGNITO_REGION || !config.COGNITO_USER_POOL || !config.CONTENTFUL_ENVIRONMENT_ID) {
            console.error("Contentful and/or Cognito values not supplied. Please set environment variables CONTENTFUL_ACCESS_TOKEN, " +
                "CONTENTFUL_SPACE_ID, CONTENTFUL_ENVIRONMENT_ID, COGNITO_REGION and COGNITO_USER_POOL.");
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