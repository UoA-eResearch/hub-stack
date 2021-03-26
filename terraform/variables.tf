#######################
#       General       #
#######################
variable "aws_region" {
  default = "ap-southeast-2"
}

variable "aws_profile" {
  default     = "my-aws-profile"
  description = "The profile to be used when running"
}

variable "lifecycle_state" {
  description = "Lifecycle status (i.e dev/test/prod)"
  default     = "test"
}

variable "aws_account_id" {
  type = string
  description = "Account id of the AWS account where the task is run"
}

#######################
#       Tags          #
#######################
variable "application" {
  description = "The application this deployment is linked to"
  default     = "N/A"
}
variable "department" {
  description = "The department this deployment is linked to"
  default     = "N/A"
}

variable "project_code" {
  description = "Project Code (if any) for the costs"
  default     = "N/A"
}

variable "cost_centre" {
  description = "The cost centre costs will be attributed to. Required"
  default     = "N/A"
}

variable "wiki_link" {
  description = "Where on the Wiki is more infomation location"
  default     = "N/A"
}

variable "faculty" {
  description = "The faculty this deployment is linked to"
  default     = "N/A"
}

variable "business_service" {
  description = "The business service this deployment is linked to"
  default     = "N/A"
}

#######################
#       Website       #
#######################
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

#####################################
# Secondary website (if applicable) #
#####################################
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

#####################################
#        2FAB callback url          #
#####################################
variable "two_fab_url" {
  description = "2fab url, used for integration testing. The url is added to the hub app client callback urls list."
}

########################
#        Route53       #
########################
# Note: Route53 hosted zone will be same for both main and secondary site
variable "route53_hosted_zone_id" {
  description = "The ID for the Route53 hosted zone that is used to route traffic from our domain(s) to CloudFront"
}

########################
#        Network       #
########################
variable "vpc_id" {
  description = "What is the ID of the VPC this will reside within"
}

variable "subnets" {
  description = "Private subnets within the VPC"
  type        = list(string)
}


########################
# Loadbalancer for ECS #
########################
variable "lb_name" {
  description = "What name should the LB be created with"
}

variable "lb_subnets" {
  description = "Which subnets should the LB be deployed into?"
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

#######################
#   ECS Environment   #
#######################
variable "ecs_cluster_name" {
  description = "What name should the ECS cluster have?"
}

variable "repository_name" {
  description = "What name should we put on the ECR Repo"
  default     = "research-hub/cer-graphql"
}

variable "kms_uoa_central_key_id" {
  description = "Id of the UoA Central Key from KMS"
}

#######################
#    ECS Services     #
#######################
variable "private_subnets" {
  description = "What subnet(s) should containers run in"
  type        = list(string)
}

variable "service_container_count" {
  description = "How many tasks should run in the main service"
  default     = 2
}

variable "service_container_count_preview" {
  description = "How many tasks should run in the preview service"
  default     = 1
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

#######################
#       Cognito       #
#######################
variable "cognito_user_pool_id" {
  description = "Cognito User Pool that we will be associating with"
}

variable "cognito_user_pool_arn" {
  description = "Full ARN of the in use Cognito User Pool"
}

variable "cognito_user_pool_domain" {
  description = "The Amazon Cognito Domain associated with the User Pool"
}

variable "cognito_identity_provider" {
  description = "What is the name of the Identity provider within the given pool?"
}

variable "permitted_group" {
  description = "What groups will be permitted access (in standard UoA syntax, i.e {group1}|{group2}|{group3})"
}

#######################
#   Contentful S3     #
#######################
variable "create_contentful_backup_bucket" {
  description = "Should the Contentful backup bucket be created."
}

###############################
#   ElasticSearch Service     #
###############################

variable "create_elasticsearch_domain" {
  description = "Should an ES domain be created."
  default     = false
}

variable "es_version" {
  type = string
  description = "The version of Elasticsearch to deploy."
}

variable "prefix" {
  type = string
  description = "common name prefix for resources in this module"
}

variable "user_pool_id" {
  type = string
  description = "Cognito user pool id"
  default = null
}

variable "identity_pool_id" {
  type = string
  description = "Cognito identity pool id"
  default = null
}

variable "cognito_iam_role_arn" {
  type = string
  description = "IAM role, used for fine-grained security control in cognito, ARN"
  default = null
}

variable "master_user_iam_role_arn" {
  type = string
  description = "IAM role, used for master user in fine-grained security control , ARN"
  default = null
}

variable "enabled_identity_providers" {
  type = list(string)
  description = "List of supported identity providers"
  default = []
}