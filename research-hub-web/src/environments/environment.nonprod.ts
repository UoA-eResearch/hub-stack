// TODO: Insert nonprod values
export const environment = {
  production: true,
  researchHubApiUrl: 'https://research-hub.auckland.ac.nz/api/',
  cerApiUrl: 'https://test.research-hub.cer.auckland.ac.nz/cer-api/',
  cerGraphQLUrl: 'https://rhubcpapi.connect.test.amazon.auckland.ac.nz/cer-graphql-service',
  cerGraphQLPreviewUrl: 'https://rhubcpapi.connect.test.amazon.auckland.ac.nz/cer-graphql-preview-service/',
  analyticsCode: '',
  auth: {
    cognitoAwsRegion: 'ap-southeast-2',
    cognitoUserPoolId: 'ap-southeast-2_gtuqqgIIq',
    cognitoDomain: 'uoapool-nonprod',
    cognitoClientId: '6gp6nveqbfrrf0fe8v13dmvbhh',
    redirectUri: 'https://research-hub.connect.test.amazon.auckland.ac.nz',
    scopes: 'openid profile https://research-hub.auckland.ac.nz/spa',
    codeChallengeMethod: 'S256',
    logout_uri: 'https://research-hub.connect.test.amazon.auckland.ac.nz'
  },
  searchUrl: 'https://apigw.test.amazon.auckland.ac.nz/hub-search-proxy',
  privateUrlKeyWords: {
    get whoNeedBearerToken() {
      return [
        { url: 'apigw.sandbox.amazon.auckland.ac.nz', optional: false },
        { url: environment.cerGraphQLUrl, optional: true }
      ]
    },
    get whoNeedIdToken() {
      return []
    }
  },
};
