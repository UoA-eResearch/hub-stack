resource "aws_cloudfront_function" "secure_headers" {
  name    = "secure_headers_${var.lifecycle_state}"
  runtime = "cloudfront-js-1.0"
  comment = "Cloudfront Function that adds secure headers to the response."
  publish = true
  code    = file("lambdas/secure-headers.js")
  tags    = local.common_tags
}