// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  env: 'dev',
  sentryTracesSampleRate: 1.0,
  production: false,
  cerGraphQLUrl: 'http://localhost:4000/',
  auth: {
    cognitoAwsRegion: 'ap-southeast-2',
    cognitoUserPoolId: 'ap-southeast-2_gtuqqgIIq',
    cognitoDomain: 'uoapool-nonprod',
    cognitoClientId: '1bdp52mqg3gm7kf4hqsgg3oks7',
    redirectUri: 'http://localhost:4200',
    scopes: 'openid profile https://research-hub-dev.auckland.ac.nz/spa',
    codeChallengeMethod: 'S256',
    logout_uri: 'http://localhost:4200'
  },
  searchUrl: 'https://apigw.test.amazon.auckland.ac.nz/hub-search-proxy-dev',
  graphURL: 'http://localhost:3000/dev/graph',
  privateUrlKeyWords: {
    get whoNeedBearerToken() {
      return [
        { url: environment.cerGraphQLUrl, optional: true },
        { url: environment.graphURL, optional: false }
      ]
    },
    get whoNeedIdToken() {
      return []
    },
  }
}
