// https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-security-headers.html

function handler(event) {
  var response = event.response;
  var headers = response.headers;

  // Set HTTP security headers
  // Since JavaScript doesn't allow for hyphens in variable names, we use the dict["key"] notation
  headers["strict-transport-security"] = {
    value: "max-age=63072000; includeSubdomains; preload",
  };
  headers["content-security-policy"] = {
    value:
      "default-src 'none'; manifest-src 'self'; connect-src 'self' www.google-analytics.com images.ctfassets.net cdn.auckland.ac.nz www.googletagmanager.com fonts.gstatic.com sentry.io *.sentry.io cdn.jsdelivr.net https://apigw.test.amazon.auckland.ac.nz/hub-search-proxy-test https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_gtuqqgIIq/.well-known/openid-configuration https://rhubcpapi.connect.test.amazon.auckland.ac.nz https://uoapool-nonprod.auth.ap-southeast-2.amazoncognito.com/oauth2/token https://apigw.test.amazon.auckland.ac.nz/content-graph-api-test/graph https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://*.googletagmanager.com; font-src https://cdn.auckland.ac.nz https://fonts.gstatic.com; frame-src https://www.youtube.com; img-src 'self' https://images.ctfassets.net www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com data:; script-src 'self' 'unsafe-eval' https://www.google-analytics.com/analytics.js https://www.googletagmanager.com/gtm.js https://www.googletagmanager.com/debug/bootstrap https://www.googletagmanager.com/gtag/js https://*.googletagmanager.com; style-src 'self' 'unsafe-inline'; report-uri https://o991241.ingest.sentry.io/api/5948230/security/?sentry_key=eb04735190794f63abc9c1ddd3d73f64&sentry_environment=test",
  };
  headers["x-content-type-options"] = { value: "nosniff" };
  headers["x-frame-options"] = { value: "DENY" };
  headers["x-xss-protection"] = { value: "1; mode=block" };

  // Return the response to viewers
  return response;
}
