// TODO: Insert nonprod values
export const environment = {
  env: 'test',
  sentryTracesSampleRate: 1.0,
  production: true,
  cerGraphQLUrl: 'https://rhubcpapi.connect.test.amazon.auckland.ac.nz/cer-graphql-service',
  cerGraphQLPreviewUrl: 'https://rhubcpapi.connect.test.amazon.auckland.ac.nz/cer-graphql-preview-service/',
  auth: {
    cognitoAwsRegion: 'ap-southeast-2',
    cognitoUserPoolId: 'ap-southeast-2_gtuqqgIIq',
    cognitoDomain: 'uoapool-nonprod',
    cognitoClientId: '68qfdhscvin9l5s07p8fv80e0b',
    redirectUri: 'https://research-hub.connect.test.amazon.auckland.ac.nz',
    scopes: 'openid profile https://research-hub-test.auckland.ac.nz/spa',
    codeChallengeMethod: 'S256',
    logout_uri: 'https://research-hub.connect.test.amazon.auckland.ac.nz'
  },
  searchUrl: 'https://apigw.test.amazon.auckland.ac.nz/hub-search-proxy-test',
  privateUrlKeyWords: {
    get whoNeedBearerToken() {
      return [
        { url: environment.cerGraphQLUrl, optional: true }
      ]
    },
    get whoNeedIdToken() {
      return []
    }
  }
};
