provider "aws" {
  region  = "ap-southeast-2"
  profile = "uoa-its-nonprod"
  version = "~> 3.0.0"
}

# Also needs to explicitly be 0.12, as 0.13 has some breaking syntax changes to providers
terraform {
  required_version = ">= 0.12"
}