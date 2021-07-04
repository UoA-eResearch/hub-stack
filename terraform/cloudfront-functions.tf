resource "aws_cloudfront_function" "secure_headers" {
  name    = "secure_headers_${var.lifecycle_state}"
  runtime = "cloudfront-js-1.0"
  comment = "Cloudfront Function that adds secure headers to the response."
  publish = true

  // We have a function per environment seeing there are differences in the Content Security Policies between environments
  code    = file("lambdas/secure-headers-${var.lifecycle_state}.js")
  tags    = local.common_tags
}