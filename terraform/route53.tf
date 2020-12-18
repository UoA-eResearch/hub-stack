resource "aws_route53_record" "main_website" {
  zone_id = var.route53_hosted_zone_id
  name    = var.dns_entry
  type    = "CNAME"
  ttl     = "300"
  records = [aws_cloudfront_distribution.main_website.domain_name]
}

resource "aws_route53_record" "secondary_website" {
  count  = var.create_secondary ? 1 : 0
  zone_id = var.route53_hosted_zone_id
  name    = var.dns_entry_secondary
  type    = "CNAME"
  ttl     = "300"
  records = [aws_cloudfront_distribution.secondary_website.domain_name]
}