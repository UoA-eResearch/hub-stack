export const environment = {
  production: true,
  cerGraphQLUrl: 'https://rhubcpapi.sandbox.amazon.auckland.ac.nz/',
  cerGraphQLPreviewUrl: 'https://rhubcpapi.sandbox.amazon.auckland.ac.nz/cer-graphql-preview-service/',
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
  searchUrl: 'https://apigw.test.amazon.auckland.ac.nz/hub-search-proxy-dev',
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
  googleTagManagerId: 'GTM-WW9MPRJ',
};
