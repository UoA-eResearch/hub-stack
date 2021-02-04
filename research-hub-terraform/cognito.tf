resource "aws_cognito_resource_server" "resource_hub" {
  identifier = "https://research-hub.auckland.ac.nz"
  name       = "research-domain"

  scope {
    scope_name        = "spa"
    scope_description = "Access scope for the Research Hub SPA"
  }
  scope {
    scope_name        = "servicenow"
    scope_description = "Access scope for the Research Hub ServiceNow"
  }
  scope {
    scope_name        = "contentful"
    scope_description = "Access scope for the Research Hub Contentful"
  }
  user_pool_id = var.cognito_user_pool_id
}

resource "aws_cognito_user_pool_client" "client" {
  name                                 = "ResearchHub-${var.lifecycle_state}"
  user_pool_id                         = var.cognito_user_pool_id
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = concat(aws_cognito_resource_server.resource_hub.scope_identifiers, ["openid", "profile"])
  allowed_oauth_flows_user_pool_client = true
  explicit_auth_flows                  = ["ALLOW_CUSTOM_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]
  callback_urls                        = concat(local.scheme_urls, ["http://localhost:4200"])
  logout_urls                          = concat(local.scheme_urls, ["http://localhost:4200"])
  supported_identity_providers         = [var.cognito_identity_provider]
  refresh_token_validity               = 1
  read_attributes                      = ["given_name", "family_name", "custom:EmpID", "custom:Groups", "name", "email", "preferred_username"]
}

resource "aws_ssm_parameter" "authorizer" {
    name = "/${var.lifecycle_state}/cognito/${aws_cognito_user_pool_client.client.id}"
    description = "Allowed access groups for App Client ${aws_cognito_user_pool_client.client.id}"
    type = "String"
    value = "Employees.prswi|Postgraduate"
    tags = local.common_tags
}