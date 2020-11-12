import { environment } from "./environment.sandbox";

environment.cerGraphQLUrl = environment.cerGraphQLPreviewUrl;

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