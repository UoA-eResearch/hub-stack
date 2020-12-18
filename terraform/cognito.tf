resource "aws_cognito_resource_server" "research_hub" {
  identifier = "https://research-hub.auckland.ac.nz"
  name       = "research-hub"

  scope {
    scope_name        = "spa"
    scope_description = "Access scope for the Research Hub SPA"
  }
  # scope {
  # scope_name        = "servicenow"
  #   scope_description = "Access scope for the Research Hub ServiceNow"
  # }
  # scope {
  #   scope_name        = "contentful"
  #   scope_description = "Access scope for the Research Hub Contentful"
  # }

  user_pool_id = var.cognito_user_pool_id
}

resource "aws_cognito_user_pool_client" "client" {
  name                                 = "research-hub-${var.lifecycle_state}"
  user_pool_id                         = var.cognito_user_pool_id
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = concat(aws_cognito_resource_server.research_hub.scope_identifiers, ["openid", "profile"])
  allowed_oauth_flows_user_pool_client = true
  explicit_auth_flows                  = ["ALLOW_CUSTOM_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]
  callback_urls                        = concat(local.scheme_urls, ["http://localhost:4200"])
  logout_urls                          = concat(local.scheme_urls, ["http://localhost:4200"])
  supported_identity_providers         = [var.cognito_identity_provider]
  refresh_token_validity               = 1
  read_attributes                      = ["given_name", "family_name", "custom:EmpID", "custom:Groups", "name", "email", "preferred_username"]
  generate_secret                      = false
}

resource "aws_ssm_parameter" "authorizer" {
    name = "/${var.lifecycle_state}/cognito/${aws_cognito_user_pool_client.client.id}"
    description = "Allowed access groups for App Client ${aws_cognito_user_pool_client.client.id}"
    type = "String"
    value = var.permitted_group
    tags = local.common_tags
}

output "aws_cognito_user_pool_client_id" {
  value       = try(aws_cognito_user_pool_client.client.id, "")
  description = "The Cognito app client id."
}

output "aws_cognito_user_pool_client_name" {
  value       = try(aws_cognito_user_pool_client.client.name, "")
  description = "The Cognito app client name."
}

output "aws_cognito_user_pool_client_callback_urls" {
  value       = try(aws_cognito_user_pool_client.client.callback_urls, "")
  description = "The Cognito app client callback urls."
}

output "aws_cognito_user_pool_client_logout_urls" {
  value       = try(aws_cognito_user_pool_client.client.logout_urls, "")
  description = "The Cognito app client logout urls."
}

output "aws_cognito_user_pool_client_allowed_oauth_scopes" {
  value       = try(aws_cognito_user_pool_client.client.allowed_oauth_scopes, "")
  description = "The Cognito app client allowed oauth scopes."
}

output "aws_cognito_user_pool_client_scope_identifiers" {
  value       = try(aws_cognito_resource_server.research_hub.scope_identifiers, "")
  description = "The Cognito app client scope_identifiers."
}