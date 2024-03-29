// TODO: Insert prod values
// Also: Insert values in environment.prod-preview.ts
export const environment = {
  env: 'prod',
  sentryTracesSampleRate: 0.2,
  production: true,
  cerGraphQLUrl: 'https://rhubcpapi.auckland.ac.nz/cer-graphql-service',
  cerGraphQLPreviewUrl: 'https://rhubcpapi.auckland.ac.nz/cer-graphql-preview-service/',
  auth: {
    cognitoAwsRegion: 'ap-southeast-2',
    cognitoUserPoolId: 'ap-southeast-2_B3Lx9B4bL',
    cognitoDomain: 'uoapool',
    cognitoClientId: '7o2oq232s4qjk93eagnj9c63e0',
    redirectUri: 'https://research-hub.auckland.ac.nz',
    scopes: 'openid profile https://research-hub-prod.auckland.ac.nz/spa',
    codeChallengeMethod: 'S256',
    logout_uri: 'https://research-hub.auckland.ac.nz'
  },
  searchUrl: 'https://apigw.prod.amazon.auckland.ac.nz/hub-search-proxy-prod',
  graphUrl: 'https://apigw.prod.amazon.auckland.ac.nz/content-graph-api-prod/graph',
  contentfulEditUrl: 'https://app.contentful.com/spaces/vbuxn5csp0ik/environments/prod/entries/',
  privateUrlKeyWords: {
    get whoNeedBearerToken() {
      return [
        { url: environment.cerGraphQLUrl, optional: true },
        { url: environment.graphUrl, optional: false }
      ]
    },
    get whoNeedIdToken() {
      return []
    }
  }
};
