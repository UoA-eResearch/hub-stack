# General
aws_region      = "ap-southeast-2"
aws_profile     = "uoa-its-nonprod"
lifecycle_state = "prod"

# Tags
application      = "Research Hub"
department       = "Centre for eResearch"
project_code     = "TBC"
cost_centre      = "TBC"
wiki_link        = "https://wiki.auckland.ac.nz/display/APPLCTN/Research+Hub"
faculty          = "Science"
business_service = "eResearch Services"

# Website specific
dns_entry              = "research-hub.prod.amazon.auckland.ac.nz"
secondary_addresses    = []
index_doc              = "index.html"
acm_arn                = "TBC"
route53_hosted_zone_id = "TBC"

# Secondary website (if applicable)
create_secondary              = false
dns_entry_secondary           = "research-hub-preview.prod.amazon.auckland.ac.nz"
secondary_addresses_secondary = []
index_doc_secondary           = "index.html"
acm_arn_secondary             = "TBC"

# Route53
route53_hosted_zone_id = "TBC"

# Loadbalancer for ECS
lb_name = "CeR-Terraform-Prod"
lb_subnets = [
  "TBC",
  "TBC",
  "TBC"
]
vpc_id           = "TBC"
ecs_lb_acm_arn   = "TBC"
r53_hosted_zone  = "prod.amazon.auckland.ac.nz"
lb_dns_name      = "rhubcpapi.prod.amazon.auckland.ac.nz"
create_dns_entry = false # prob true?

# ECS Environment
ecs_cluster_name = "cer-graphql-cluster"
repository_name  = "research-hub/cer-graphql"

# ECS Services
private_subnets = [
  "TBC",
  "TBC",
  "TBC"
]
service_container_count = 1
fargate_base_weight     = 0
fargate_base_count      = 0
fargate_spot_weight     = 100
fargate_spot_count      = 1

#Cognito
cognito_user_pool_id      = "TBC"
cognito_user_pool_arn     = "TBC"
cognito_user_pool_domain  = "TBC"
cognito_identity_provider = "TBC"
permitted_group           = "TBC"

# S3 Contentful Backup Bucket
create_contentful_backup_bucket = true