# General
aws_region      = "ap-southeast-2"
aws_profile     = "uoa-its-nonprod"
lifecycle_state = "test"

# Tags
application      = "Research Hub"
department       = "Centre for eResearch"
project_code     = "TBC"
cost_centre      = "TBC"
wiki_link        = "https://wiki.auckland.ac.nz/display/APPLCTN/Research+Hub"
faculty          = "Science"
business_service = "eResearch Services"

# Website specific
dns_entry              = "research-hub.connect.test.amazon.auckland.ac.nz"
secondary_addresses    = []
index_doc              = "index.html"
acm_arn                = "arn:aws:acm:us-east-1:518380838815:certificate/ca2097b7-29ae-456d-a0f5-3bdf9c7d8b66"

# Secondary website (if applicable)
create_secondary              = true
dns_entry_secondary           = "research-hub-preview.connect.test.amazon.auckland.ac.nz"
secondary_addresses_secondary = []
index_doc_secondary           = "index.html"
acm_arn_secondary             = "arn:aws:acm:us-east-1:518380838815:certificate/ca2097b7-29ae-456d-a0f5-3bdf9c7d8b66"

# Route53
route53_hosted_zone_id = "Z165SO9T1OX8VZ"

# Loadbalancer for ECS
lb_name = "CeR-Terraform-Test"
lb_subnets = [
  "subnet-0f5df2d778a581f28",  # uoa-connect-nonprod-public-alb-a  10.0.118.0/24
  "subnet-01f535e3b10cf7635",  # uoa-connect-nonprod-public-alb-b  10.0.119.0/24
  "subnet-0edcf885fe9115a3e"   # uoa-connect-nonprod-public-alb-c  10.0.120.0/24
]
vpc_id           = "vpc-05ace6f7251ef59c3" # uoa-connect-nonprod  10.0.64.0/18
ecs_lb_acm_arn   = "arn:aws:acm:ap-southeast-2:518380838815:certificate/feace7b3-0427-4ed9-b873-b6e7824aa2be"
r53_hosted_zone  = "connect.test.amazon.auckland.ac.nz"
lb_dns_name      = "rhubcpapi.connect.test.amazon.auckland.ac.nz"
create_dns_entry = true

# ECS Environment
ecs_cluster_name = "cer-graphql-cluster"
repository_name  = "research-hub/cer-graphql"

# ECS Services
private_subnets = [
  "subnet-0d0a68988c480b3a4",  # uoa-connect-nonprod-private-app-a  10.0.88.0/21
  "subnet-0b56849cba433ce13",  # uoa-connect-nonprod-private-app-b  10.0.96.0/21
  "subnet-0fc970830487f2323"   # uoa-connect-nonprod-private-app-c  10.0.104.0/21
]
service_container_count = 2
service_container_count_preview = 1
fargate_base_weight     = 0
fargate_base_count      = 0
fargate_spot_weight     = 100
fargate_spot_count      = 1

#Cognito
cognito_user_pool_id      = "ap-southeast-2_gtuqqgIIq"
cognito_user_pool_arn     = "arn:aws:cognito-idp:ap-southeast-2:518380838815:userpool/ap-southeast-2_gtuqqgIIq"
cognito_user_pool_domain  = "uoapool-nonprod"
cognito_identity_provider = "UoATestIDP"
permitted_group           = "Postgraduate.psrwi|staffIntranetUser.ec"

# S3 Contentful Backup Bucket
create_contentful_backup_bucket = false