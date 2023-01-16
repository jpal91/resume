resource "aws_lb" "current" {
    name               = "${var.service_name}-lb"
    load_balancer_type = "application"
    security_groups    = [ aws_security_group.alb.id ]
    subnets            = [aws_subnet.subnet1.id, aws_subnet.subnet2.id]
    enable_deletion_protection = false
}

resource "aws_alb_listener" "http" {
    load_balancer_arn = aws_lb.current.id
    port              = 80
    protocol          = "HTTP"

    default_action {
        target_group_arn = aws_alb_target_group.target_group.id
        type             = "forward"
    }
}

data "aws_acm_certificate" "issued" {
    domain = "justinthecloud.dev"
    statuses = ["ISSUED"]
}

resource "aws_alb_listener" "https" {
    load_balancer_arn = aws_lb.current.id
    port = 443
    protocol = "HTTPS"
    ssl_policy = "ELBSecurityPolicy-2016-08"
    certificate_arn = data.aws_acm_certificate.issued.arn

    default_action {
      type = "forward"
      target_group_arn = aws_alb_target_group.target_group.id
    }
}

resource "aws_alb_target_group" "target_group" {
    name = "${var.service_name}-tg"
    port = 80
    protocol = "HTTP"
    vpc_id = aws_vpc.main.id
    target_type = "ip"
    health_check {
        healthy_threshold   = "3"
        interval            = "30"
        protocol            = "HTTP"
        matcher             = "200"
        timeout             = "3"
        path                = "/"
        unhealthy_threshold = "2"
    }
}