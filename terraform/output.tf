output "repository_id" {
  value       = aws_ecr_repository.graphql.repository_url
  description = "The repository to place the image for the service to pull it from"
}

output "Please_create_the_following_values_in_parameter_store" {
    value = "/${var.lifecycle_state}/research-hub/contentful-access-token, /${var.lifecycle_state}/research-hub/contentful-preview-access-token, /${var.lifecycle_state}/research-hub/contentful-space-id, /${var.lifecycle_state}/research-hub/cognito-region, /${var.lifecycle_state}/research-hub/cognito-user-pool"
}