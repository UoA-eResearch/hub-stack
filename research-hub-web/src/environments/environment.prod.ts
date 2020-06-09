export const environment = {
  production: true,
  researchHubApiUrl: 'https://dev.research-hub.cer.auckland.ac.nz/api/', // TODO: Replace hardcoded URLS
  cerApiUrl: 'https://dev.research-hub.cer.auckland.ac.nz/cer-api/',
  analyticsCode: 'UA-77710107-3',
  auth: {
    cognitoAwsRegion: 'ap-southeast-2',
    cognitoUserPoolId: 'ap-southeast-2_pgErjyL4O',
    cognitoDomain: 'uoapool-sandbox',
    cognitoClientId: '53nj363gumskeibdir61nu1cs5',
    redirectUri: 'http://localhost:4200',
    scopes: 'openid profile https://test-domain.auckland.ac.nz/lambda-hello-world',
    codeChallengeMethod: 'S256',
    logout_uri: 'http://localhost:4200'
  },
  privateUrlKeyWords: {
    whoNeedBearerToken: ['apigw.sandbox.amazon.auckland.ac.nz', 'some-other-api'],
    whoNeedIdToken: []
  }
};
