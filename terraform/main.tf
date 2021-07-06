terraform {
  required_version = ">= 0.12"
  backend "s3" {
    key     = "researchhub/terraform.tfstate"
  }
}

provider "aws" {
  version = ">= 3.41.0"
  region  = var.aws_region
  profile = var.aws_profile
  ignore_tags {
    key_prefixes = ["AutoTag"]
  }
}

locals {
  common_tags = {
    "Department"      = var.department
    "BusinessService" = var.business_service
    "Application"     = var.application
    "ProjectCode"     = var.project_code
    "CostCentre"      = var.cost_centre
    "WikiLink"        = var.wiki_link
    "Faculty"         = var.faculty
  }
  all_urls = compact(concat([var.dns_entry, var.dns_entry_secondary, var.lb_dns_name], var.secondary_addresses, var.secondary_addresses_secondary))
  scheme_urls = [for url in local.all_urls : join("", ["https://", url])]
}

data "aws_caller_identity" "current" {}

data "aws_iam_account_alias" "current" {}