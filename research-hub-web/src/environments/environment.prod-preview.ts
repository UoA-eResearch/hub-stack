// TODO: Fill in prod preview values.

import { environment } from "./environment.nonprod";

environment.cerGraphQLUrl = environment.cerGraphQLPreviewUrl;
environment.auth.redirectUri = "";
environment.auth.logout_uri = "";

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