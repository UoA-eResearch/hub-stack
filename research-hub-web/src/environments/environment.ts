// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  researchHubApiUrl: 'https://research-hub.auckland.ac.nz/api/',
  cerApiUrl: 'https://dev.research-hub.cer.auckland.ac.nz/cer-api/',
  cerGraphQLUrl: 'http://localhost:4000/',
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
    },
  },
  
}