resource "aws_cloudfront_function" "secure_headers" {
  name    = "research_hub_secure_headers_${var.lifecycle_state}"
  runtime = "cloudfront-js-1.0"
  comment = "Cloudfront Function that adds secure headers to the response."
  publish = true

  // We have a function per environment seeing there are differences in the Content Security Policies between environments
  code    = file("lambdas/secure-headers-${var.lifecycle_state}.js")
}

resource "aws_cloudfront_function" "redirect_spa" {
  name    = "research_hub_redirect_spa_${var.lifecycle_state}"
  runtime = "cloudfront-js-1.0"
  comment = "Cloudfront Function that redirects requests to index.html for SPA."
  publish = true

  code    = file("lambdas/redirect-spa.js")
}