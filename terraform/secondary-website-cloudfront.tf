resource "aws_cloudfront_distribution" "secondary-website" {
  count = var.create_secondary ? 1 : 0
  origin {
    origin_id   = var.dns_entry_secondary
    domain_name = aws_s3_bucket.site_secondary[count.index].bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity_secondary[count.index].cloudfront_access_identity_path
    }
  }

  # If using route53 aliases for DNS we need to declare it here too, otherwise we'll get 403s.
  aliases = concat(
    [var.dns_entry_secondary],
    [for name in var.secondary_addresses_secondary :
    join("", [name])]
  )

  enabled             = true
  default_root_object = var.index_doc
  is_ipv6_enabled     = true

  default_cache_behavior {
    # The following commented block shows how to configure a Lambda@Edge
    # This is useful for securing the distribution further.
    # See https://medium.com/faun/hardening-the-http-security-headers-with-aws-lambda-edge-and-cloudfront-2e2da1ae4d83
    /*
    lambda_function_association {
      event_type = "origin-request"
      lambda_arn = "arn:aws:lambda:us-east-1:630143336532:function:iNZightRepo_cloudfront_lambda:1"
    }
    */

    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.dns_entry_secondary

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    #http-to-https redirect. Default cache times
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Log to bucket. Leave bucket as is, if Cloud Team is on the ball then no issues should arise.
  logging_config {
    include_cookies = false
    bucket          = "uoa-security-cloudfront-access-logs.s3.amazonaws.com"
    prefix          = "${data.aws_iam_account_alias.current.account_alias}/${var.dns_entry_secondary}/"
  }

  price_class = "PriceClass_All"

  # This is required to be specified even if it's not used.
  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  # Specify custom error pages
  /*
  custom_error_response = [
    {
      error_code = "400"
      response_page_path  = "/errors/4xx-errors/400.html"
      response_code = "400"
    }
  ]
  */

  # Setup the SSL certificate that is used with HTTPS
  # The protocol version specified is compliant with UoA Web Policy
  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = var.acm_arn_secondary
    minimum_protocol_version       = "TLSv1.2_2018"
    ssl_support_method             = "sni-only"
  }

  # Keep things simple
  tags = merge(
    local.common_tags,
    {
      "Name" = "${var.dns_entry_secondary}-Distribution"
    },
  )
}