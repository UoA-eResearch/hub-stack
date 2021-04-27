// TODO: Insert prod values
// Also: Insert values in environment.prod-preview.ts
export const environment = {
  production: true,
  cerGraphQLUrl: 'https://rhubcpapi.connect.amazon.auckland.ac.nz/cer-graphql-service',
  cerGraphQLPreviewUrl: 'https://rhubcpapi.connect.amazon.auckland.ac.nz/cer-graphql-preview-service/',
  auth: {
    cognitoAwsRegion: 'ap-southeast-2',
    cognitoUserPoolId: 'ap-southeast-2_B3Lx9B4bL',
    cognitoDomain: 'uoapool',
    cognitoClientId: '7o2oq232s4qjk93eagnj9c63e0',
    redirectUri: 'https://research-hub.connect.amazon.auckland.ac.nz',
    scopes: 'openid profile https://research-hub-prod.auckland.ac.nz/spa',
    codeChallengeMethod: 'S256',
    logout_uri: 'https://research-hub.connect.amazon.auckland.ac.nz'
  },
  searchUrl: 'https://apigw.prod.amazon.auckland.ac.nz/hub-search-proxy-prod',
  privateUrlKeyWords: {
    get whoNeedBearerToken() {
      return [
        { url: environment.cerGraphQLUrl, optional: true }
      ]
    },
    get whoNeedIdToken() {
      return []
    }
  },
};
