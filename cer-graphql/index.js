const { ApolloServer } = require('apollo-server');
const { introspectSchema, makeRemoteExecutableSchema, mergeSchemas } = require('graphql-tools');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

// Measure server startup time
var startTime = new Date().getTime();

// Contentful settings
const CONTENTFUL_ACCESS_TOKEN='9d5de88248563ebc0d2ad688d0473f56fcd31c600e419d6c8962f6aed0150599';
const CONTENTFUL_SPACE_ID='f8bqpb154z8p';


// Set up remote schemas
// Load a remote schema and set up the http-link
getRemoteSchema = async(remoteUri) => {
    try {
        console.log('Loading remote schema:', remoteUri)
        const link = new HttpLink({ uri: remoteUri, fetch });
        const schema = await introspectSchema(link);

        console.log('Remote schema loaded successfully.')
        return makeRemoteExecutableSchema({
            schema,
            link,
        });
    } catch(e) {
        console.error(e);
    }
}

// Set up the schemas and initialize the server
(async () => {

    // Load remote schemas here
    contentfulSchema = await getRemoteSchema(`https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}?access_token=${CONTENTFUL_ACCESS_TOKEN}`);

    // Merge all schemas (remote and local) here
    const schema = mergeSchemas({
        schemas: [
            contentfulSchema
        ],
        resolvers: [{
            Query: {
                lessonCollection: (root, args, context, info) => {
                    if(context.user) { // If the user is signed in, simply forward request
                        return info.mergeInfo.delegateToSchema({
                            schema: contentfulSchema,
                            operation: 'query',
                            fieldName: 'lessonCollection',
                            args,
                            context,
                            info
                        });
                    } else { // If the user is not signed, forward request with additional filtering arguments
                        return info.mergeInfo.delegateToSchema({
                            schema: contentfulSchema,
                            operation: 'query',
                            fieldName: 'lessonCollection',
                            args: {
                                where: {
                                    enabled: true
                                }
                            },
                            context,
                            info
                        });
                    } 
                }
            }
        }]
    });

    const server = new ApolloServer({ 
        schema,
        context: ({ req }) => {
            // user = { upi: 'skav012' }; // Get session here
            user = null;
            return  { user };
        },
    });

    // The 'listen' method launches a web server.
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}. Server started in: ${new Date().getTime() - startTime}ms.`);
    });

})();
