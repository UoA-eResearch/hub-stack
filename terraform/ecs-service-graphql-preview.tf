
resource "aws_ecs_task_definition" "graphql_preview" {
  family                   = "cer-graphql-preview-${var.lifecycle_state}"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_task_assume.arn
  tags = merge(
    local.common_tags,
    {
      "Name" = "graphql_preview ecs_task_definition"
    },
  )

  container_definitions = <<DEFINITION
[
  {
    "essential": true,
    "image": "${aws_ecr_repository.graphql.repository_url}:latest",
    "networkMode": "awsvpc",
    "name": "cer-graphql",
    "logConfiguration": {
      "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/cer-graphql-preview-${var.lifecycle_state}",
          "awslogs-region": "${var.aws_region}",
          "awslogs-create-group": "true",
          "awslogs-stream-prefix": "ecs"
      }
    },
    "environment": [
      {"name": "IS_PREVIEW_ENV", "value": "true"}
    ],
    "portMappings": [
      {
        "containerPort": 4000
      }
    ],
    "secrets": [
        {
         "valueFrom": "arn:aws:ssm:${var.aws_region}:${data.aws_caller_identity.current.account_id}:parameter/${var.lifecycle_state}/research-hub/contentful-preview-access-token",
         "name": "CONTENTFUL_ACCESS_TOKEN"
        },
        {
          "valueFrom": "arn:aws:ssm:${var.aws_region}:${data.aws_caller_identity.current.account_id}:parameter/${var.lifecycle_state}/research-hub/contentful-space-id",
          "name": "CONTENTFUL_SPACE_ID"
        },
        {
          "valueFrom": "arn:aws:ssm:${var.aws_region}:${data.aws_caller_identity.current.account_id}:parameter/${var.lifecycle_state}/research-hub/cognito-region",
          "name": "COGNITO_REGION"
        },
        {
          "valueFrom": "arn:aws:ssm:${var.aws_region}:${data.aws_caller_identity.current.account_id}:parameter/${var.lifecycle_state}/research-hub/cognito-user-pool",
          "name": "COGNITO_USER_POOL"
        },
        {
          "valueFrom": "arn:aws:ssm:${var.aws_region}:${data.aws_caller_identity.current.account_id}:parameter/${var.lifecycle_state}/research-hub/contentful-environment-id",
          "name": "CONTENTFUL_ENVIRONMENT_ID"
        }
    ]
  }
]
DEFINITION

}

# This is used to catch versions (see service)
data "aws_ecs_task_definition" "graphql_preview" {
  task_definition = aws_ecs_task_definition.graphql_preview.family

  depends_on = [aws_ecs_task_definition.graphql_preview]
}

resource "aws_ecs_service" "preview" {
  name                    = "cer-graphql-preview-service-${var.lifecycle_state}"
  cluster                 = aws_ecs_cluster.cer.id
  enable_ecs_managed_tags = true
  propagate_tags          = "SERVICE"
  desired_count           = var.service_container_count_preview
  # Check to make sure the most recent task revision
  # is used. This can occur when manual changes are made during
  # the Terraform run
  task_definition = "${aws_ecs_task_definition.graphql_preview.family}:${max(
    aws_ecs_task_definition.graphql_preview.revision,
    data.aws_ecs_task_definition.graphql_preview.revision,
  )}"

  # Below we can define cost saving strategies
  # Do we want any Spot instances?
  capacity_provider_strategy {
    capacity_provider = "FARGATE"
    weight            = var.fargate_base_weight
    base              = var.fargate_base_count
  }
  capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    weight            = var.fargate_spot_weight
    base              = var.fargate_spot_count
  }

  network_configuration {
    subnets         = var.private_subnets
    security_groups = [aws_security_group.graphql_sg.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.ecs-cer-graphql-preview.arn
    container_name   = "cer-graphql"
    container_port   = 4000
  }

  # This will ensure we always keep a certain amount running
  # at any given time. No outages!
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200
  tags = merge(
    local.common_tags,
    {
      "Name" = "graphql-preview-service-definition"
    },
  )
  depends_on = [aws_lb_target_group.ecs-cer-graphql-preview]
  lifecycle {
    # create_before_destroy = true
    ignore_changes = [desired_count]
  }
}

# We could at this point also define autoscaling!

# Configure the TG the Service will attach to.
# IP is the setting needed for Fargate
resource "aws_lb_target_group" "ecs-cer-graphql-preview" {
  name        = "ecs-cer-graphql-preview-${var.lifecycle_state}"
  port        = "80"
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    path                = "/.well-known/apollo/server-health"
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
    matcher             = "200"
  }

  depends_on = [aws_lb.ecs-load-balancer]
}

resource "aws_lb_listener_rule" "routing-preview" {
  listener_arn = aws_lb_listener.alb-listener.arn

  priority = 2

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ecs-cer-graphql-preview.id
  }

  # Based upon work in Sandbox
  condition {
    path_pattern {
      values = ["/cer-graphql-preview-service*"]
    }
  }
}
