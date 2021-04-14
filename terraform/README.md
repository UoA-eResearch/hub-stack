# CeR ResearchHub Terraform Stack
---
This solution will provision the core requirements of the ResearchHub environment (excluding those that deploy via Serverless Framework).

## Prerequisites
1. Download and install the Terraform command line tool: https://www.terraform.io/downloads.html
2. Create AWS temporary credentials for the AWS account you are deploying to. Instructions for accessing the credentials are on the [Auckland Uni wiki](https://wiki.auckland.ac.nz/pages/viewpage.action?spaceKey=UC&title=AWS+Temporary+Credentials+for+CLI). Make sure you name the credentials profile according to what is defined in the backend.conf definition for the env you are deploying to (e.g. for nonprod, the profile should be 'uoa-its-nonprod').

## Usage

1. Initialize the Terraform backend and provider plugins (run `terraform init -backend-config=envs/<env-name>/backend.conf`)
2. Make changes to the variables and resources defined in the .tfvars and .tf files as required.
3. View the infrastructure that will be created/updated (run `terraform plan -var-file=<var-file>`)
4. Create/update the infrastructure in AWS (run `terraform apply -var-file=<var-file>`)
5. View output values in the console. 
6. Use the outputs:
  - Update/create required parameter store values
  - Update the relevant environment variables in hub-stack, research-hub-web, and hub-search-proxy env files etc
  - Update Jenkinsfile with S3 bucket names and Cloudfront distribution IDs (for main and secondary (preview) websites)
7. Deploy static website files and cer-graphql by triggering the appropriate Jenkins CI/CD pipeline.

## Terraform Commands

For more commands see the [CLI reference](https://www.terraform.io/docs/commands/index.html)

**Initialize Terraform backend so the tfstate will be stored in s3**
- Before running this command, ensure you have created the AWS temporary credentials for the AWS account you are deploying to.

terraform init -backend-config=envs/env-name/backend.conf
e.g. `terraform init -backend-config=envs/its-nonprod/backend.conf`

You can check the backend s3 bucket defined in [main.tf](main.tf) to ensure the state has been stored. This 'remote state' can then be used by other team members in order to create, read, update, or destroy the current resources. Read more [here](https://www.terraform.io/docs/language/settings/backends/index.html).

**Check the plan for what infrastructure will be created/updated**

terraform plan -var-file=var-file -out=tfplan
e.g. `terraform plan -var-file=envs/its-nonprod/hub-test.tfvars -out=tfplan`

**Apply (create/update) infrastructure**

terraform apply -var-file=var-file
e.g. `terraform apply -var-file=envs/its-nonprod/hub-test.tfvars`

**Query output variables**

terraform output

**Teardown infrastructure**

1. view what will be destroyed:
terraform plan -destroy -var-file=var-file
2. destroy:
terraform destroy -var-file=var-file --auto-approve

**CI/CD in Jenkins**

A Jenkins pipeline can be used to invoke the Terraform actions to either create or destroy infrastructure. For the prod environment, changes can ONLY be done via Jenkins. The pipeline is called [hub-infrastructure-deploy](https://prod.jenkins-new.auckland.ac.nz/job/Centre%20for%20eResearch%20(CeR)/job/hub-infrastructure-deploy/). To trigger the pipeline, go to 'Build with Parameters' and enter the deployment env (dev, test or prod), whether you want to create or destroy, and which branch to take the Terraform scripts from (generally should be master).

## Explanation of variables used

| Input | Description |
| -----------  | ----------- |
| **General** | ----------- |
| aws_region | What region this is to be deployed in |
| aws_profile | What profile is to be used to access AWS |
| lifecycle_state | What Lifecycle state this deployment is (i.e dev/test/prod) |
| aws_account_id | What AWS Account this deployment is (i.e sandbox/nonprod/prod) | 
| application | The application this deployment is linked to. |
| department | Which team/department is looking after this application |
| project_code | What Project Code is in use (if applicable, otherwise NA) |
| cost_centre | The Cost Centre this resides under. Needed even if Project Code is provided |
| wiki_link | What is the best place to get information about the deployed environment (needs to be short link) |
| business_service | The Business Service this resides under. |
| faculty | The Faculty this resides under. |
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
| **2Fab callback url** | ----------- |
| two_fab_url | 2fab url, used for integration testing. The url is added to the hub app client callback urls list. |
| -----------  | ----------- |
| **Route53 Routing** | ----------- |
| route53_hosted_zone_id | The ID for the Route53 hosted zone that is used to route traffic from our domain(s) to CloudFront |
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
| service_container_count | How many containers should be running in the  main service |
| service_container_count_preview | How many containers should be running in the preview service |
| fargate_base_weight | What weighting should be given so proportions of containers run on Base Fargate (Weights must sum to 100) |
| fargate_base_count | How many containers should explicitly run on base Fargate |
| fargate_spot_weight | What weighting should be given so proportions of containers run on Fargate Spot (Weights must sum to 100) | 
| fargate_spot_count | How many containers should explicitly run on Fargate Spot |
| -----------  | ----------- |
| **Cognito** | ----------- |
| cognito_user_pool_id | Cognito User Pool that we will be associating with |
| cognito_user_pool_arn | Full ARN of the in use Cognito User Pool |
| cognito_user_pool_domain | The Amazon Cognito Domain associated with the User Pool |
| cognito_identity_provider | What is the name of the Identity provider within the given pool |
| permitted_group | What groups will be permitted access |
| -----------  | ----------- |
| **ElasticSearch Service** | ----------- |
| create_elasticsearch_domain | Should an ES domain be created? Theoretically only one domain (in prod) should be required |
| es_version | The version of Elasticsearch to deploy |
| prefix | Common name prefix for resources in this module |
| user_pool_id | Cognito user pool id for master user access to Kibana |
| identity_pool_id | Cognito identity pool id for master user access to Kibana |
| cognito_iam_role_arn | IAM role, used for fine-grained security control in cognito, ARN |
| master_user_iam_role_arn | IAM role, used for master user in fine-grained security control , ARN |
| enabled_identity_providers | List of supported identity providers |
| -----------  | ----------- |