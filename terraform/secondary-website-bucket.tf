resource "aws_s3_bucket" "secondary_website" {
  count  = var.create_secondary ? 1 : 0
  bucket = var.dns_entry_secondary

  tags = merge(
    local.common_tags,
    {
      "Name" = var.dns_entry_secondary
    },
  )

  lifecycle {
    ignore_changes = [
      logging
    ]
  }
}

resource "aws_s3_bucket_versioning" "secondary_website_versioning" {
  bucket = aws_s3_bucket.secondary_website.id
  
  versioning_configuration {
    status = "Suspended"
  }
}

# Encrypt the data at rest. We use the default Service Side Encryption
# in order to minimize issues between CloudFront and KMS
resource "aws_s3_bucket_server_side_encryption_configuration" "secondary_website_server_side_encryption" {
  bucket = aws_s3_bucket.secondary_website.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_acl" "secondary_website_acl" {
  bucket = aws_s3_bucket.secondary_website.id
  acl    = "private"
}

resource "aws_s3_bucket_policy" "cdn_access_policy_secondary" {
  count  = var.create_secondary ? 1 : 0
  bucket = aws_s3_bucket.secondary_website[count.index].id
  policy = data.aws_iam_policy_document.s3_policy_secondary[count.index].json
}

# Policy to allow the created Access Identity to access the bucket
data "aws_iam_policy_document" "s3_policy_secondary" {
  count = var.create_secondary ? 1 : 0
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.secondary_website[count.index].arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity_secondary[count.index].iam_arn]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.secondary_website[count.index].arn]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity_secondary[count.index].iam_arn]
    }
  }
  # This ensures all S3 actions are over HTTPS
  statement {
    actions   = ["s3:GetObject", "s3:PutObject"]
    resources = ["${aws_s3_bucket.secondary_website[count.index].arn}/*"]
    effect    = "Deny"
    sid       = "BlockNonSSL"
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    condition {
      test     = "Bool"
      variable = "aws:SecureTransport"
      values   = ["false"]
    }
  }
}

# This will shore up access so only CloudFront can access S3
resource "aws_cloudfront_origin_access_identity" "origin_access_identity_secondary" {
  count   = var.create_secondary ? 1 : 0
  comment = "CloudFront Access identity to S3 for ${var.dns_entry_secondary}"
}

output "aws_s3_bucket_name_secondary_website" {
  value       = try(aws_s3_bucket.secondary_website[0].bucket, "")
  description = "The secondary (preview) website S3 bucket name."
}