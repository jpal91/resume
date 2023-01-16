resource "aws_cloudwatch_log_group" "containers" {
    name              = "/aws/ecs/${var.service_name}"
    retention_in_days = 7
    tags = {
        Terraform = "true"
        Name = "cloudwatch-group-${var.service_name}"
  }
}

resource "aws_cloudwatch_log_group" "current" {
    name = "${var.service_name}-ecs"  
}