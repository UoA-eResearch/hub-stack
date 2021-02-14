# General
aws_region      = "ap-southeast-2"
aws_profile     = "uoa-its-nonprod"
lifecycle_state = "prod"
aws_account_id = "TBC"

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

# Network
vpc_id           = "TBC"
subnets = ["TBC", "TBC", "TBC"]

# Loadbalancer for ECS
lb_name = "CeR-Terraform-Prod"
lb_subnets = [
  "TBC",
  "TBC",
  "TBC"
]
ecs_lb_acm_arn   = "TBC"
r53_hosted_zone  = "prod.amazon.auckland.ac.nz"
lb_dns_name      = "rhubcpapi.prod.amazon.auckland.ac.nz"
create_dns_entry = false # prob true?

# ECS Environment
ecs_cluster_name = "cer-graphql-cluster"
repository_name  = "research-hub/cer-graphql"
kms_uoa_central_key_id = "180f8f50-c1f3-4b9a-b793-0fca514ab708"

# ECS Services
private_subnets = [
  "TBC",
  "TBC",
  "TBC"
]
service_container_count = 2
service_container_count_preview = 1
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

# ElasticSearch Service
es_version = 7.9
prefix = "researchhub"

#Id for Managed User pool 'uoa-pool'
user_pool_id = "TBC"
#Id for Managed Identity pool 'uoa_identity_pool'
identity_pool_id = "TBC"
#ARN for IAM role 'CognitoAccessForAmazonES'
cognito_iam_role_arn = "TBC"
#ARN for IAM role 'Authenticated-ES-Access'
master_user_iam_role_arn = "TBC"
#Name for Identity Provider
enabled_identity_providers = ["TBC"]