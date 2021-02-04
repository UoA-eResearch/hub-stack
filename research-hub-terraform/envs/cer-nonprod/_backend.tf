# These values cannot be interpolated
# Ensure these are set so that state is maintained and can be cleaned up
# Uncomment and fill in details as per https://www.terraform.io/docs/backends/types/s3.html
terraform {
  backend "s3" {
    bucket         = "uoa-cer-nonprod-terraforms-states"
    key            = "researchhub-poc/"
    region         = "ap-southeast-2"
    profile        = "uoa-cer-nonprod"
  }
}