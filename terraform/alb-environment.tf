# Basic ALB configuration
resource "aws_lb" "ecs-load-balancer" {
  name            = var.lb_name
  security_groups = [aws_security_group.loadbalancer_sg.id]
  subnets         = var.lb_subnets

  access_logs {
    bucket  = "uoa-security-loadbalancer-access-logs"
    prefix  = "${data.aws_iam_account_alias.current.account_alias}/${var.lb_name}"
    enabled = true
  }

  tags = local.common_tags
}

resource "aws_route53_record" "ecs-lb-entry" {
  count   = var.create_dns_entry ? 1 : 0
  zone_id = data.aws_route53_zone.host_zone[count.index].id
  name    = var.lb_dns_name
  type    = "A"

  alias {
    name                   = aws_lb.ecs-load-balancer.dns_name
    zone_id                = aws_lb.ecs-load-balancer.zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "ecs-lb-entry-ipv6" {
  count   = var.create_dns_entry ? 1 : 0
  zone_id = data.aws_route53_zone.host_zone[count.index].id
  name    = var.lb_dns_name
  type    = "AAAA"

  alias {
    name                   = aws_lb.ecs-load-balancer.dns_name
    zone_id                = aws_lb.ecs-load-balancer.zone_id
    evaluate_target_health = false
  }
}

data "aws_route53_zone" "host_zone" {
  count        = var.create_dns_entry ? 1 : 0
  name         = var.r53_hosted_zone
  private_zone = false
}

# Generic Inbound Rules for a LB
resource "aws_security_group" "loadbalancer_sg" {
  name        = "${var.lb_name}-Security-Group"
  description = "Security Group for the loadbalancer"
  vpc_id      = var.vpc_id

  # Web Traffic Ports
  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"

    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }

  ingress {
    from_port = 443
    to_port   = 443
    protocol  = "tcp"

    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }

  tags = merge(
    local.common_tags,
    {
      "Name" = "${var.lb_name}-Security-Group"
    },
  )
}

# Here we can potentially add more services should it be needed
# Being specific allows us to maintain least privilege
resource "aws_security_group_rule" "container_outbound" {
  type                     = "egress"
  from_port                = "0"
  to_port                  = "0"
  protocol                 = "-1"
  source_security_group_id = aws_security_group.graphql_sg.id
  security_group_id        = aws_security_group.loadbalancer_sg.id
}

# Redirect insecure to secure
# Even with basic messages we don't want information leakage
resource "aws_lb_listener" "alb-listener-insecure" {
  load_balancer_arn = aws_lb.ecs-load-balancer.id
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }

  depends_on = [aws_lb.ecs-load-balancer]
}

# Default secure response is that nothing is there
# No real difference between having this or not,
# however it can be a nice addition, and makes scaling 
# a matter of adding services to the listener without 
# messing with the default
resource "aws_lb_listener" "alb-listener" {
  load_balancer_arn = aws_lb.ecs-load-balancer.id
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn   = var.ecs_lb_acm_arn
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"

  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "Your Princess is in another Castle!"
      status_code  = "404"
    }
  }

  depends_on = [aws_lb.ecs-load-balancer]
}