import { environment } from "./environment.dev";


environment.env = 'dev-preview';
environment.cerGraphQLUrl = environment.cerGraphQLPreviewUrl;
environment.auth.redirectUri = "https://research-hub-dev-preview.connect.test.amazon.auckland.ac.nz";
environment.auth.logout_uri = "https://research-hub-dev-preview.connect.test.amazon.auckland.ac.nz";

environment.privateUrlKeyWords = {
  get whoNeedBearerToken() {
    return [
      { url: environment.cerGraphQLUrl, optional: true },
      { url: environment.graphUrl, optional: false }
    ]
  },
  get whoNeedIdToken() {
    return []
  }
};

export { environment };
