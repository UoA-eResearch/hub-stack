import { environment } from "./environment.sandbox";

environment.cerGraphQLUrl = environment.cerGraphQLPreviewUrl;
environment.auth.redirectUri = "http://localhost:4200";
environment.auth.logout_uri = "research-hub-preview.sandbox.amazon.auckland.ac.nz/";

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