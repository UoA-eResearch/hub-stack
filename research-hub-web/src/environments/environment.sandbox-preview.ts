import { environment } from "./environment.sandbox";

environment.cerGraphQLUrl = environment.cerGraphQLPreviewUrl;
environment.auth.redirectUri = "https://research-hub-preview.sandbox.amazon.auckland.ac.nz";
environment.auth.logout_uri = "https://research-hub-preview.sandbox.amazon.auckland.ac.nz";

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