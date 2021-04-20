resource "aws_route53_record" "main_website" {
  count = var.create_route53_entry ? 1 : 0
  zone_id = var.route53_hosted_zone_id
  name    = var.dns_entry
  type    = "CNAME"
  ttl     = "300"
  records = [aws_cloudfront_distribution.main_website.domain_name]
}

resource "aws_route53_record" "secondary_website" {
  count  = var.create_route53_entry ? 1 : 0
  zone_id = var.route53_hosted_zone_id
  name    = var.dns_entry_secondary
  type    = "CNAME"
  ttl     = "300"
  records = [aws_cloudfront_distribution.secondary_website[count.index].domain_name]
}


# Use for specific domain name registered in on-prem DNS (i.e. for prod env)
# (see https://wiki.auckland.ac.nz/display/ITCB/AWS+Host+S3+Static+Web+Content#CreateDistribution)

# Create route53 hosted zone
resource "aws_route53_zone" "main" {
  count = var.create_route53_zone ? 1 : 0
  name  = var.dns_entry
}

# Create IPv4 alias route53 record in hosted zone
resource "aws_route53_record" "main_website_ipv4" {
  count = var.create_route53_zone ? 1 : 0
  zone_id = aws_route53_zone.main[0].id
  name    = var.dns_entry
  type    = "A"

  alias {
    name = aws_cloudfront_distribution.main_website.domain_name
    zone_id = aws_cloudfront_distribution.main_website.hosted_zone_id
    evaluate_target_health = false
  }
}

# Create IPv6 alias route53 record in hosted zone
resource "aws_route53_record" "main_website_ipv6" {
  count = var.create_route53_zone ? 1 : 0
  zone_id = aws_route53_zone.main[0].id
  name    = var.dns_entry
  type    = "AAAA"

  alias {
    name = aws_cloudfront_distribution.main_website.domain_name
    zone_id = aws_cloudfront_distribution.main_website.hosted_zone_id
    evaluate_target_health = false
  }
}


# Secondary site

# Create route53 hosted zone
resource "aws_route53_zone" "secondary" {
  count = var.create_route53_zone ? 1 : 0
  name  = var.dns_entry_secondary
}

# Create IPv4 alias route53 record in hosted zone
resource "aws_route53_record" "secondary_website_ipv4" {
  count = var.create_route53_zone ? 1 : 0
  zone_id = aws_route53_zone.secondary[0].id
  name    = var.dns_entry_secondary
  type    = "A"

  alias {
    name = aws_cloudfront_distribution.secondary_website[0].domain_name
    zone_id = aws_cloudfront_distribution.secondary_website[0].hosted_zone_id
    evaluate_target_health = false
  }
}

# Create IPv6 alias route53 record in hosted zone
resource "aws_route53_record" "secondary_website_ipv6" {
  count = var.create_route53_zone ? 1 : 0
  zone_id = aws_route53_zone.secondary[0].id
  name    = var.dns_entry_secondary
  type    = "AAAA"

  alias {
    name = aws_cloudfront_distribution.secondary_website[0].domain_name
    zone_id = aws_cloudfront_distribution.secondary_website[0].hosted_zone_id
    evaluate_target_health = false
  }
}