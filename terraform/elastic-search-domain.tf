resource "aws_elasticsearch_domain" "elasticsearch_domain" {
  domain_name = "${var.prefix}-${var.lifecycle_state}-domain"
  elasticsearch_version = var.es_version
  cluster_config {
    instance_type = "t3.small.elasticsearch"
    instance_count = 2
    dedicated_master_enabled = false
    zone_awareness_config {
      availability_zone_count = 2
    }
    zone_awareness_enabled = true
  }

  ebs_options {
    ebs_enabled = true
    volume_size = "10"  # for a total of 20GB (2 x instances)
  }

  domain_endpoint_options {
    enforce_https       = true
    tls_security_policy = "Policy-Min-TLS-1-2-2019-07"
  }

  advanced_security_options {
    enabled                        = true
    internal_user_database_enabled = false
    master_user_options {
      master_user_arn     = var.master_user_iam_role_arn
    }
  }

  cognito_options {
    enabled = true
    user_pool_id = var.user_pool_id
    identity_pool_id = var.identity_pool_id
    role_arn = var.cognito_iam_role_arn
  }

  tags = merge(
    local.common_tags,
    {
      "Name" = "${var.prefix}-${var.lifecycle_state}-elasticsearch"
    },
  )

  encrypt_at_rest {
    enabled = true
    kms_key_id = var.kms_uoa_central_key_id
  }

  node_to_node_encryption {
    enabled = true
  }

  access_policies =<<CONFIG
   {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": [
            "*"
          ]
        },
        "Action": [
          "es:*"
        ],
        "Resource": "arn:aws:es:ap-southeast-2:${var.aws_account_id}:domain/${var.prefix}-${var.lifecycle_state}-domain/*"
      }
    ]
  }
  CONFIG
}

output "elasticsearch_endpoint" {
  value       = try(aws_elasticsearch_domain.elasticsearch_domain.endpoint, "")
  description = "Endpoint for the ElasticSearch domain"
}

output "kibana_endpoint" {
  value       = try(aws_elasticsearch_domain.elasticsearch_domain.kibana_endpoint, "")
  description = "Endpoint for Kibana"
}

# manual step required for config of Kibana app client - see https://github.com/hashicorp/terraform-provider-aws/issues/5557
output "modify_kibana_appclient" {
  value       = "Please find the Kibana cognito app client in AWS console and change IDP to the UoA IDP."
  description = "manual step required for config of Kibana app client"
}