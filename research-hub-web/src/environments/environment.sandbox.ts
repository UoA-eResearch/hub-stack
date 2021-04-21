export const environment = {
  production: true,
  researchHubApiUrl: 'https://research-hub.auckland.ac.nz/api/',
  cerApiUrl: 'https://dev.research-hub.cer.auckland.ac.nz/cer-api/', // TODO: Remove cer-api logic
  cerGraphQLUrl: 'https://rhubcpapi.sandbox.amazon.auckland.ac.nz/',
  cerGraphQLPreviewUrl: 'https://rhubcpapi.sandbox.amazon.auckland.ac.nz/cer-graphql-preview-service/',
  analyticsCode: '', // TODO: Add Google Analytics
  auth: {
    cognitoAwsRegion: 'ap-southeast-2',
    cognitoUserPoolId: 'ap-southeast-2_pgErjyL4O',
    cognitoDomain: 'uoapool-sandbox',
    cognitoClientId: '53nj363gumskeibdir61nu1cs5',
    redirectUri: 'https://research-hub.sandbox.amazon.auckland.ac.nz',
    scopes: 'openid profile https://test-domain.auckland.ac.nz/lambda-hello-world',
    codeChallengeMethod: 'S256',
    logout_uri: 'https://research-hub.sandbox.amazon.auckland.ac.nz'
  },
  searchUrl: 'https://apigw.test.amazon.auckland.ac.nz/hub-search-proxy-test',
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
