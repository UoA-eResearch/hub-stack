data "aws_cognito_user_pools" "primary_pool"{
    name = "uoa-pool"
}

output "cognito_values" {
    value = data.aws_cognito_user_pools.primary_pool.ids
}