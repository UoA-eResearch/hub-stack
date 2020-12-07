# General Setups
variable "aws_region" {
  default = "ap-southeast-2"
}

variable "aws_profile" {
  default     = "my-aws-profile"
  description = "The profile to be used when running"
}

variable "lifecycle_state" {
  description = "Lifecycle status (i.e dev/tst/prd)"
  default     = "tst"
}

# Tags (to keep finance happy)
variable "department" {
  description = "The department this deployment is linked to"
}

variable "project_code" {
  description = "Project Code (if any) for the costs"
  default     = "N/A"
}

variable "cost_centre" {
  description = "The cost centre costs will be attributed to. Required"
}

variable "wiki_link" {
  description = "Where on the Wiki is more infomation location"
}

# Website specific
variable "dns_entry" {
  default     = "my_domain.auckland.ac.nz"
  description = "What URL should this site be reachable via. MUST be included on the used certificate"
}

variable "secondary_addresses" {
  default     = []
  description = "Are there any secondary URL's that need to be available on the distribution. MUST be included on the used certificate"
  type        = list(string)
}

variable "index_doc" {
  default     = "index.html"
  description = "The index document that is used to load the webpage"
}

variable "acm_arn" {
  description = "The AWS ARN for the SSL certificate to be used. This is mandatory, but must be created before this step due to our hybrid DNS configuration"
}

# Secondary website (if applicable)
variable "create_secondary" {
  default     = false
  description = "Should the secondary distribution and site be setup. MUST be included on the used certificate"
}

variable "dns_entry_secondary" {
  default     = "my_domain.auckland.ac.nz"
  description = "What URL should the secondary site be reachable via"
}

variable "secondary_addresses_secondary" {
  default     = []
  description = "Are there any secondary URL's that need to be available on the distribution for the secondary site. MUST be included on the used certificate"
  type        = list(string)
}

variable "index_doc_secondary" {
  default     = "index.html"
  description = "The index document that is used to load the webpage for the secondary site"
}

variable "acm_arn_secondary" {
  description = "The AWS ARN for the SSL certificate to be used for the secondary site"
}

# Loadbalancer for ECS

variable "lb_name" {
  description = "What name should the LB be created with"
}

variable "lb_subnets" {
  description = "Which subnets should the LB be deployed into?"
}

variable "vpc_id" {
  description = "What is the ID of the VPC this will reside within"
}

variable "ecs_lb_acm_arn" {
  description = "The AWS ARN for the SSL certificate to be used for the LB"
}

variable "create_dns_entry" {
  description = "Is there a hosted zone that is available for creating the record in"
  default     = false
}

variable "r53_hosted_zone" {
  description = "DNS Name of the hosted zone where we will create an entry"
}

variable "lb_dns_name" {
  description = "DNS Name that the LB will be accessible via"
}

# ECS Environment

variable "ecs_cluster_name" {
  description = "What name should the ECS cluster have?"
}

variable "repository_name" {
  description = "What name should we put on the ECR Repo"
  default     = "research-hub/cer-graphql"
}

# ECS Services

variable "private_subnets" {
  description = "What subnet(s) should containers run in"
  type        = list(string)
}

variable "service_container_count" {
  description = "How many tasks should run in the service"
  default     = 2
}

variable "fargate_base_weight" {
  description = "What weighting of containers should run on standard (PAYG) Fargate (Guaranteed resources). Must sum to 100 with fargate_spot_weight"
  default     = 0
}

variable "fargate_base_count" {
  description = "How many containers should run on standard (PAYG) Fargate (Guaranteed resources) Needs to add up to the your service_container_count variable"
  default     = 0
}
variable "fargate_spot_weight" {
  description = "What weighting of containers should run on spot Fargate (no guarantee, but cheaper). Must sum to 100 with fargate_base_weight"
  default     = 100
}
variable "fargate_spot_count" {
  description = "How many containers should run on standard (PAYG) Fargate (Guaranteed resources) Needs to add up to the your service_container_count variable"
  default     = 2
}

# Cognito

variable "cognito_user_pool_id" {
  description = "Cognito User Pool that we will be associating with"
}

variable "cognito_identity_provider" {
  description = "What is the name of the Identity provider within the given pool?"
}

# API Gateway
#variable "api-gw-domain" {
#    description = "The domain to attach the deployment to in order to facilitate clean versioning"
#}