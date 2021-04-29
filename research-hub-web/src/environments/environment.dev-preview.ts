import { environment } from "./environment.dev";

environment.cerGraphQLUrl = environment.cerGraphQLPreviewUrl;
environment.auth.redirectUri = "https://research-hub-dev-preview.connect.test.amazon.auckland.ac.nz";
environment.auth.logout_uri = "https://research-hub-dev-preview.connect.test.amazon.auckland.ac.nz";

environment.privateUrlKeyWords = {
  get whoNeedBearerToken() {
    return [
      { url: 'apigw.test.amazon.auckland.ac.nz', optional: false },
      { url: environment.cerGraphQLUrl, optional: true }
    ]
  },
  get whoNeedIdToken() {
    return []
  }
};

export { environment };