# CeR ResearchHub Terraform Stack
---
This solution will provision the core requirements of the ResearchHub environment (excluding those that deploy via Serverless Framework).

All inline comments should explain what they are doing or why they are set a certain way.

| Input | Description |
| -----------  | ----------- |
| **General** | ----------- |
| aws_region | What region this is to be deployed in |
| aws_profile | What profile is to be used to access AWS |
| lifecycle_state | What Lifecycle state this deployment is (i.e dev/tst/prd) | 
| department | Which team/department is looking after this application |
| project_code | What Project Code is in use (if applicable, otherwise NA) |
| cost_centre | The Cost Centre this resides under. Needed even if Project Code is provided |
| wiki_link | What is the best place to get information about the deployed environment (needs to be short link) |
| -----------  | ----------- |
| **Website specific** | ----------- |
| dns_entry | Primary DNS entry for the website |
| secondary_addresses | Any (if existing) Secondary DNS names the site will be accessible via |
| index_doc | The root document that users will land on, relative to the base of the S3 Bucket |
| acm_arn | ARN of certificate in us-east-1 that will be attached to the Website (not created by Terraform due to Hybrid DNS situation) |
| -----------  | ----------- |
| **Secondary website (if applicable)** | ----------- |
| create_secondary | Should the second Bucket/CloudFront be setup? |
| dns_entry_secondary | What will be the main DNS entry for the secondary site |
| secondary_addresses_secondary | Any other DNS names the secondary site will be accessed via |
| index_doc_secondary | The root document that users will land on for the second site, relative to the base of the S3 Bucket |
| acm_arn_secondary | ARN of certificate in us-east-1 that will be attached to the Secondary Website (not created by Terraform due to Hybrid DNS situation) |
| -----------  | ----------- |
| **Loadbalancer for ECS** | ----------- |
| lb_name | Friendly name for the Loadbalancer |
| lb_subnets | List of subnets the LB will be running in |
| vpc_id | ID of the VPC we are running from |
| ecs_lb_acm_arn | ARN of the certificate that is attached to the loadbalancer (not created by Terraform due to Hybrid DNS situation) |
| r53_hosted_zone | Hosted Zone in R53 to create the DNS entry for the LB (if possible, TBC) |
| lb_dns_name | DNS Name that will be created in above hosted zone |
| -----------  | ----------- |
| **ECS Environment** | ----------- |
| ecs_cluster_name | Name of the Cluster that the containers will be in |
| repository_name | Name for the repo the containers will be in |
| -----------  | ----------- |
| **ECS Services** | ----------- |
| private_subnets | What subnets the containers will run from |
| service_container_count | How many containers should be running in the service |
| fargate_base_weight | What weighting should be given so propotions of conatiners run on Base Fargate (Weights must sum to 100) |
| fargate_base_count | How many containers should explicitly run on base Fargate |
| fargate_spot_weight | What weighting should be given so propotions of conatiners run on Fargate Spot (Weights must sum to 100) | 
| fargate_spot_count | How many containers should explicitly run on Fargate Spot |
| -----------  | ----------- |
| **S3 Bucket for Contentful Backup** | ----------- |
| create_contentful_backup_bucket | Should the S3 bucket be created? (Only need for prod?) |