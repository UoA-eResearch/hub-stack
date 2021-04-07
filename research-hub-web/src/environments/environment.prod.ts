// TODO: Insert prod values
export const environment = {
  production: true,
  cerGraphQLUrl: '',
  cerGraphQLPreviewUrl: '',
  analyticsCode: '',
  auth: {
    cognitoAwsRegion: 'ap-southeast-2',
    cognitoUserPoolId: '',
    cognitoDomain: '',
    cognitoClientId: '',
    redirectUri: 'https://research-hub.auckland.ac.nz',
    scopes: '',
    codeChallengeMethod: 'S256',
    logout_uri: 'https://research-hub.auckland.ac.nz'
  },
  searchUrl: 'https://apigw.prod.amazon.auckland.ac.nz/hub-search-proxy',
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
