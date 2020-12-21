# General
aws_region      = "ap-southeast-2"
aws_profile     = "uoa-sandbox"
lifecycle_state = "dev"

# Tags
application      = "Research Hub"
department       = "Centre for eResearch"
project_code     = "TBC"
cost_centre      = "TBC"
wiki_link        = "https://wiki.auckland.ac.nz/display/APPLCTN/Research+Hub"
faculty          = "Science"
business_service = "eResearch Services"

# Website specific
dns_entry              = "research-hub.sandbox.amazon.auckland.ac.nz"
secondary_addresses    = []
index_doc              = "index.html"
acm_arn                = "arn:aws:acm:us-east-1:416527880812:certificate/74e9a6bf-78cc-443b-a1dd-2cd9127719d3"

# Secondary website (if applicable)
create_secondary              = false
dns_entry_secondary           = "research-hub-preview.sandbox.amazon.auckland.ac.nz"
secondary_addresses_secondary = []
index_doc_secondary           = "index.html"
acm_arn_secondary             = "arn:aws:acm:us-east-1:416527880812:certificate/74e9a6bf-78cc-443b-a1dd-2cd9127719d3"

# Route53
route53_hosted_zone_id = "ZMGQD6EYUM762"

# Loadbalancer for ECS
lb_name = "research-hub-public-lb"   # arn:aws:elasticloadbalancing:ap-southeast-2:416527880812:loadbalancer/app/research-hub-public-lb/9db900eab79d1dd7
lb_subnets = [
  "subnet-b4a78dd3",  # uoa-sandbox-public-sydney-a  10.0.12.0/26
  "subnet-e0e5c2a9",  # uoa-sandbox-public-sydney-b  10.0.12.64/26
  "subnet-e09e3ab8"   # uoa-sandbox-public-sydney-c  10.0.12.128/26
]
vpc_id           = "vpc-1e77d279"  # uoa-sandbox  10.0.12.0/22
ecs_lb_acm_arn   = "arn:aws:acm:ap-southeast-2:416527880812:certificate/21f9b615-c2e1-4070-a5d5-1c2ba234f539"
r53_hosted_zone  = "sandbox.amazon.auckland.ac.nz"
lb_dns_name      = "rhubcpapi.sandbox.amazon.auckland.ac.nz" # research-hub-public-lb-1550820285.ap-southeast-2.elb.amazonaws.com
create_dns_entry = true

# ECS Environment
ecs_cluster_name = "cer-graphql-cluster"
repository_name  = "research-hub/cer-graphql"

# ECS Services
private_subnets = [
  "subnet-90752ef7",  # uoa-sandbox-private-sydney-a  10.0.14.0/24
  "subnet-4feb9106",  # uoa-sandbox-private-sydney-b  10.0.15.0/24
  "subnet-968e59ce"   # uoa-sandbox-private-sydney-c  10.0.13.0/24
]
service_container_count = 2
service_container_count_preview = 1
fargate_base_weight     = 0
fargate_base_count      = 0
fargate_spot_weight     = 100
fargate_spot_count      = 1

#Cognito
cognito_user_pool_id      = "ap-southeast-2_pgErjyL4O"
cognito_user_pool_arn     = "arn:aws:cognito-idp:ap-southeast-2:416527880812:userpool/ap-southeast-2_pgErjyL4O"
cognito_user_pool_domain  = "uoapool-sandbox"
cognito_identity_provider = "UoATestIDP"
permitted_group           = "Postgraduate.psrwi|staffIntranetUser.ec"

# S3 Contentful Backup Bucket
create_contentful_backup_bucket = false