// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  shibbolethSessionUrl: './Session.json',
  researchHubApiUrl: 'https://dev.research-hub.cer.auckland.ac.nz/api/',
  cerApiUrl: 'https://dev.research-hub.cer.auckland.ac.nz/cer-api/',
  analyticsCode: 'UA-77710107-3',
  auth: {
    cognitoAwsRegion: 'ap-southeast-2',
    cognitoUserPoolId: 'ap-southeast-2_pgErjyL4O',
    cognitoDomain: 'uoapool-sandbox',
    cognitoClientId: 'lrju6v80vse4bbaesjvnr2ff0',
    redirectUri: 'http://localhost:4200',
    scopes: 'openid profile https://test-domain.auckland.ac.nz/lambda-hello-world',
    codeChallengeMethod: 'S256',
    logout_uri: 'http://localhost:4200'
  },
  privateUrlKeyWords: {
    whoNeedBearerToken: ['apigw.sandbox.amazon.auckland.ac.nz', 'some-other-api'],
    whoNeedIdToken: []
  }
}
