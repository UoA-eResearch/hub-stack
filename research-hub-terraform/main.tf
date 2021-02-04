provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
  version = "~> 3.0.0"
  ignore_tags {
    key_prefixes = ["AutoTag"]
  }
}

# Also needs to explicitly be 0.12, as 0.13 has some breaking syntax changes to providers
terraform {
  required_version = ">= 0.12"
}

locals {
  common_tags = {
    "Department"      = var.department
    "BusinessService" = "Web Hosting"
    "Application"     = var.dns_entry
    "ProjectCode"     = var.project_code
    "CostCentre"      = var.cost_centre
    "WikiLink"        = var.wiki_link
  }
  all_urls = compact(concat([var.dns_entry, var.dns_entry_secondary, var.lb_dns_name], var.secondary_addresses, var.secondary_addresses_secondary))
  scheme_urls = [for url in local.all_urls : join("", ["https://", url])]
}

data "aws_caller_identity" "current" {}

data "aws_iam_account_alias" "current" {}