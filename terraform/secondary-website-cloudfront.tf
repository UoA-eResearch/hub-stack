resource "aws_cloudfront_distribution" "secondary_website" {
  count = var.create_secondary ? 1 : 0
  origin {
    origin_id   = var.dns_entry_secondary
    domain_name = aws_s3_bucket.secondary_website[count.index].bucket_regional_domain_name

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
  is_ipv6_enabled     = false
  web_acl_id          = var.create_firewall ? aws_waf_web_acl.waf_acl[0].id : null

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.dns_entry_secondary
    
    # support gzip and other http transfer compression
    compress         = true

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

    lambda_function_association {
      event_type = "origin-response"
      lambda_arn = "${TBC}"
    }
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
  # The following is required for a SPA to redirect to base
  custom_error_response {
    error_code            = "403"
    response_page_path    = "/index.html"
    response_code         = "200"
    error_caching_min_ttl = 60
  }

  custom_error_response {
    error_code            = "404"
    response_page_path    = "/index.html"
    response_code         = "200"
    error_caching_min_ttl = 5
  }

  # Setup the SSL certificate that is used with HTTPS
  # The protocol version specified is compliant with UoA Web Policy
  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = var.acm_arn_secondary
    minimum_protocol_version       = "TLSv1.2_2019"
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

output "cf_id_secondary" {
  value       = try(aws_cloudfront_distribution.secondary_website[0].id, "")
  description = "ID of CloudFront distribution"
}

output "cf_arn_secondary" {
  value       = try(aws_cloudfront_distribution.secondary_website[0].arn, "")
  description = "ARN of CloudFront distribution"
}

output "cf_aliases_secondary" {
  value       = try(aws_cloudfront_distribution.secondary_website[0].aliases, "")
  description = "Extra CNAMEs of AWS CloudFront"
}

output "cf_status_secondary" {
  value       = try(aws_cloudfront_distribution.secondary_website[0].status, "")
  description = "Current status of the distribution"
}

output "cf_domain_name_secondary" {
  value       = try(aws_cloudfront_distribution.secondary_website[0].domain_name, "")
  description = "Domain name corresponding to the distribution"
}

output "cf_hosted_zone_id_secondary" {
  value       = try(aws_cloudfront_distribution.secondary_website[0].hosted_zone_id, "")
  description = "CloudFront Route 53 Zone ID"
}

output "cf_origin_access_identity_secondary" {
  value       = try(aws_cloudfront_origin_access_identity.origin_access_identity_secondary[0].cloudfront_access_identity_path, "")
  description = "A shortcut to the full path for the origin access identity to use in CloudFront"
}