export const environment = {
  production: true,
  researchHubApiUrl: 'https://dev.research-hub.cer.auckland.ac.nz/api/',
  cerApiUrl: 'https://dev.research-hub.cer.auckland.ac.nz/cer-api/', // TODO: Remove cer-api logic
  analyticsCode: '', // TODO: Add Google Analytics
  auth: {
    cognitoAwsRegion: 'ap-southeast-2',
    cognitoUserPoolId: 'ap-southeast-2_pgErjyL4O',
    cognitoDomain: 'uoapool-sandbox',
    cognitoClientId: '53nj363gumskeibdir61nu1cs5',
    redirectUri: 'http://localhost:4200', // TODO: Fix callback URLs
    scopes: 'openid profile https://test-domain.auckland.ac.nz/lambda-hello-world',
    codeChallengeMethod: 'S256',
    logout_uri: 'http://localhost:4200'
  },
  privateUrlKeyWords: {
    whoNeedBearerToken: ['apigw.sandbox.amazon.auckland.ac.nz', 'some-other-api'],
    whoNeedIdToken: []
  }
};
