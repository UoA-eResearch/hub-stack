// TODO: Insert nonprod values
export const environment = {
  production: true,
  cerGraphQLUrl: 'https://rhubcpapi-dev.connect.test.amazon.auckland.ac.nz/cer-graphql-service',
  cerGraphQLPreviewUrl: 'https://rhubcpapi-dev.connect.test.amazon.auckland.ac.nz/cer-graphql-preview-service/',
  auth: {
    cognitoAwsRegion: 'ap-southeast-2',
    cognitoUserPoolId: 'ap-southeast-2_gtuqqgIIq',
    cognitoDomain: 'uoapool-nonprod',
    cognitoClientId: '1bdp52mqg3gm7kf4hqsgg3oks7',
    redirectUri: 'https://research-hub-dev.connect.test.amazon.auckland.ac.nz',
    scopes: 'openid profile https://research-hub-dev.auckland.ac.nz/spa',
    codeChallengeMethod: 'S256',
    logout_uri: 'https://research-hub-dev.connect.test.amazon.auckland.ac.nz'
  },
  searchUrl: 'https://apigw.test.amazon.auckland.ac.nz/hub-search-proxy',
  privateUrlKeyWords: {
    get whoNeedBearerToken() {
      return [
        { url: 'apigw.test.amazon.auckland.ac.nz', optional: false },
        { url: environment.cerGraphQLUrl, optional: true }
      ]
    },
    get whoNeedIdToken() {
      return []
    }
  },
};
