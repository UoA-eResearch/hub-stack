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
lb_name = "CeR-Terraform-Dev"
lb_subnets = [
  "subnet-0f5df2d778a581f28",
  "subnet-01f535e3b10cf7635",
  "subnet-0edcf885fe9115a3e"
]
vpc_id           = "vpc-05ace6f7251ef59c3"
ecs_lb_acm_arn   = "arn:aws:acm:ap-southeast-2:518380838815:certificate/d82fed8f-e5ee-44c6-9710-643b0dd401b6"
r53_hosted_zone  = "sandbox.amazon.auckland.ac.nz"
lb_dns_name      = "rhubcpapi.sandbox.amazon.auckland.ac.nz"
create_dns_entry = false 

# ECS Environment
ecs_cluster_name = "cer-test"
repository_name  = "test-repo"

# ECS Services
private_subnets = [
  "subnet-0d0a68988c480b3a4",
  "subnet-0b56849cba433ce13",
  "subnet-0fc970830487f2323"
]
service_container_count = 1
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