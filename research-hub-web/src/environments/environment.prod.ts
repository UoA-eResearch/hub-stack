// TODO: Insert prod values
// Also: Insert values in environment.prod-preview.ts
export const environment = {
  production: true,
  cerGraphQLUrl: 'https://rhubcpapi.auckland.ac.nz/cer-graphql-service',
  cerGraphQLPreviewUrl: 'https://rhubcpapi.auckland.ac.nz/cer-graphql-preview-service/',
  auth: {
    cognitoAwsRegion: 'ap-southeast-2',
    cognitoUserPoolId: 'ap-southeast-2_B3Lx9B4bL',
    cognitoDomain: 'uoapool',
    cognitoClientId: 'TBC',
    redirectUri: 'https://research-hub.auckland.ac.nz',
    scopes: 'openid profile https://research-hub-prod.auckland.ac.nz/spa',
    codeChallengeMethod: 'S256',
    logout_uri: 'https://research-hub.auckland.ac.nz'
  },
  searchUrl: 'https://apigw.prod.amazon.auckland.ac.nz/hub-search-proxy-prod',
  privateUrlKeyWords: {
    get whoNeedBearerToken() {
      return [
        { url: 'apigw.prod.amazon.auckland.ac.nz', optional: false },
        { url: environment.cerGraphQLUrl, optional: true }
      ]
    },
    get whoNeedIdToken() {
      return []
    }
  },
};
