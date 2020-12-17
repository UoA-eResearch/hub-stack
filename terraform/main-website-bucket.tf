resource "aws_s3_bucket" "site" {
  bucket = var.dns_entry
  acl    = "private"

  versioning {
    enabled = true
  }

  # Encrypt the data at rest. We use the default Service Side Encryption
  # in order to minimize issues between CloudFront and KMS
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = merge(
    local.common_tags,
    {
      "Name" = var.dns_entry
    },
  )
}

resource "aws_s3_bucket_policy" "cdn_access_policy" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

# Policy to allow the created Access Identity to access the bucket
data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.site.arn]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
    }
  }
}

# This will shore up access so only CloudFront can access S3
resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "CloudFront Access identity to S3 for ${var.dns_entry}"
}