// TODO: Insert nonprod values
export const environment = {
  production: true,
  researchHubApiUrl: '',
  cerApiUrl: '',
  analyticsCode: '',
  auth: {
    cognitoAwsRegion: 'ap-southeast-2',
    cognitoUserPoolId: '',
    cognitoDomain: '',
    cognitoClientId: '',
    redirectUri: '',
    scopes: '',
    codeChallengeMethod: 'S256',
    logout_uri: ''
  },
  privateUrlKeyWords: {
    whoNeedBearerToken: ['', ''],
    whoNeedIdToken: []
  }
};
