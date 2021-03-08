resource "aws_ecs_cluster" "cer" {
  name = var.ecs_cluster_name
}

# We will leave this separate in case we want to revist other options

resource "aws_ecr_repository" "graphql" {
  name = var.repository_name
  # Let AWS run vulnerability scanning on image push
  image_scanning_configuration {
    scan_on_push = true
  }
}

# Lets set this to automatically delete images that are untagged
# after 1 week to save a bit of money
resource "aws_ecr_lifecycle_policy" "graphql" {
  repository = aws_ecr_repository.graphql.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Expire images older than 7 days",
            "selection": {
                "tagStatus": "untagged",
                "countType": "sinceImagePushed",
                "countUnit": "days",
                "countNumber": 7
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}