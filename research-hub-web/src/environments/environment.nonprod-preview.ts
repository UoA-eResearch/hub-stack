import { environment } from "./environment.nonprod";

environment.cerGraphQLUrl = environment.cerGraphQLPreviewUrl;
environment.auth.redirectUri = "https://research-hub-preview.connect.test.amazon.auckland.ac.nz";
environment.auth.logout_uri = "https://research-hub-preview.connect.test.amazon.auckland.ac.nz";

environment.privateUrlKeyWords = {
  get whoNeedBearerToken() {
    return [
      { url: 'apigw.sandbox.amazon.auckland.ac.nz', optional: false },
      { url: environment.cerGraphQLUrl, optional: false }
    ]
  },
  get whoNeedIdToken() {
    return []
  }
};

export { environment };