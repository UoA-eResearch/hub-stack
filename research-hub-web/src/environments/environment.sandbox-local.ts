import { environment } from "./environment.sandbox";

environment.cerGraphQLUrl = environment.cerGraphQLPreviewUrl;
environment.auth.redirectUri = "http://localhost:4200";
environment.auth.logout_uri = "http://localhost:4200";

environment.privateUrlKeyWords = {
  get whoNeedBearerToken() {
    return [
      { url: 'apigw.sandbox.amazon.auckland.ac.nz', optional: false },
      { url: environment.cerGraphQLUrl, optional: true }
    ]
  },
  get whoNeedIdToken() {
    return []
  }
};

export { environment };