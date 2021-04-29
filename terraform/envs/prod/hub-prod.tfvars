# General
aws_region      = "ap-southeast-2"
aws_profile     = "uoa-its-prod"
lifecycle_state = "prod"
aws_account_id = "291148375163"

# Tags
application      = "Research Hub"
department       = "Centre for eResearch"
project_code     = "TBC"
cost_centre      = "TBC"
wiki_link        = "https://wiki.auckland.ac.nz/display/APPLCTN/Research+Hub"
faculty          = "Science"
business_service = "eResearch Services"

# Website specific
dns_entry              = "research-hub.auckland.ac.nz"  # research-hub.auckland.ac.nz
secondary_addresses    = []
index_doc              = "index.html"
acm_arn                = "arn:aws:acm:us-east-1:291148375163:certificate/c6705781-1c22-44c2-8621-67651509300a"
create_route53_entry   = false    # Prod uses on-prem DNS. see https://wiki.auckland.ac.nz/display/ITCB/AWS+Host+S3+Static+Web+Content#CreateDistribution
# create_route53_zone    = true    # TBC - not sure if this is required. 

# Secondary website (if applicable)
create_secondary              = true
dns_entry_secondary           = "research-hub-preview.auckland.ac.nz"  # research-hub-preview.auckland.ac.nz
secondary_addresses_secondary = []
index_doc_secondary           = "index.html"
acm_arn_secondary             = "arn:aws:acm:us-east-1:291148375163:certificate/be64d589-aecc-4495-b4c5-d9b23e622ef6"

# 2FAB callback url - not used in prod, just here as placeholder
two_fab_url = "https://apigw.prod.amazon.auckland.ac.nz/aws-token-grabber/"

# Route53
route53_hosted_zone_id = "ZLHJUA7WC63E9"  # Prod uses on-prem DNS

# Network
vpc_id           = "vpc-0b478c527a885336d"

# Loadbalancer for ECS
lb_name = "rhubcpapi-lb-prod"
lb_subnets = [
  "subnet-097a1e115544b6973",  # uoa-connect-prod-public-alb-a
  "subnet-0b3c069a3631aba32",  # uoa-connect-prod-public-alb-b
  "subnet-0643e4f2882512a33"   # uoa-connect-prod-public-alb-c
]
ecs_lb_acm_arn   = "arn:aws:acm:ap-southeast-2:291148375163:certificate/554e7247-187b-4a67-917a-570f7500cd83"
r53_hosted_zone  = "N/A"
lb_dns_name      = "rhubcpapi.auckland.ac.nz"
create_dns_entry = false

# ECS Environment
ecs_cluster_name = "cer-graphql-cluster-prod"
repository_name  = "research-hub/cer-graphql-prod"
kms_uoa_central_key_id = "457b5e68-e513-4b70-adf9-70eca8298d83"

# ECS Services
private_subnets = [
  "subnet-008ef14c8a3818b31", 
  "subnet-09489834fe62d8b27", 
  "subnet-09a1e1f3a0d8166c2"
]
service_container_count = 2
service_container_count_preview = 1
fargate_base_weight     = 0
fargate_base_count      = 0
fargate_spot_weight     = 100
fargate_spot_count      = 1

#Cognito
cognito_user_pool_id      = "ap-southeast-2_B3Lx9B4bL"
cognito_user_pool_arn     = "arn:aws:cognito-idp:ap-southeast-2:291148375163:userpool/ap-southeast-2_B3Lx9B4bL"
cognito_user_pool_domain  = "uoapool"
cognito_identity_provider = "UoAProdIDP"
permitted_group           = "staffIntranetUser.ec"

# ElasticSearch Service
create_elasticsearch_domain = true
es_version = 7.9
prefix = "researchhub"

#Id for Managed User pool 'uoa-pool'
user_pool_id = "ap-southeast-2_B3Lx9B4bL"
#Id for Managed Identity pool 'uoa_identity_pool'
identity_pool_id = "ap-southeast-2:81153c18-d3d7-416d-8e3e-9fa77b722eae"
#ARN for IAM role 'CognitoAccessForAmazonES'
cognito_iam_role_arn = "arn:aws:iam::291148375163:role/service-role/CognitoAccessForAmazonES"
#ARN for IAM role 'Authenticated-ES-Access'
master_user_iam_role_arn = "arn:aws:iam::291148375163:role/Authenticated-ES-Access"
#Name for Identity Provider
enabled_identity_providers = ["UoAProdIDP"]