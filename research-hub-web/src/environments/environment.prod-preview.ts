import { environment } from "./environment.prod";

environment.cerGraphQLUrl = environment.cerGraphQLPreviewUrl;
environment.auth.redirectUri = "https://research-hub-preview.connect.amazon.auckland.ac.nz";
environment.auth.logout_uri = "https://research-hub-preview.connect.amazon.auckland.ac.nz";

environment.privateUrlKeyWords = {
  get whoNeedBearerToken() {
    return [
      { url: 'apigw.prod.amazon.auckland.ac.nz', optional: false },
      { url: environment.cerGraphQLUrl, optional: true }
    ]
  },
  get whoNeedIdToken() {
    return []
  }
};

export { environment };