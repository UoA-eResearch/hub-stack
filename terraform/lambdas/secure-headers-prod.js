// https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-security-headers.html

function handler(event) {
  var response = event.response;
  var headers = response.headers;

  // Set HTTP security headers
  // Since JavaScript doesn't allow for hyphens in variable names, we use the dict["key"] notation 
  headers['strict-transport-security'] = { value: 'max-age=63072000; includeSubdomains; preload'}; 
  headers['content-security-policy'] = { 
    value: "default-src 'none'; connect-src https://apigw.prod.amazon.auckland.ac.nz/hub-search-proxy-prod https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_B3Lx9B4bL/.well-known/openid-configuration https://rhubcpapi.auckland.ac.nz https://uoapool.auth.ap-southeast-2.amazoncognito.com/oauth2/token https://www.google-analytics.com/j/collect; font-src https://cdn.auckland.ac.nz https://fonts.gstatic.com; frame-src https://www.youtube.com; img-src 'self' https://images.ctfassets.net https://www.google-analytics.com; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google-analytics.com/analytics.js https://www.googletagmanager.com/gtm.js; style-src 'self' 'unsafe-inline'"
  };
  headers['x-content-type-options'] = { value: 'nosniff'}; 
  headers['x-frame-options'] = {value: 'DENY'}; 
  headers['x-xss-protection'] = {value: '1; mode=block'};

  // Return the response to viewers 
  return response;
}