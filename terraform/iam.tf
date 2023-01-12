resource "aws_iam_role" "ecs_task_execution_role" {
    name = "${var.service_name}-ecs-task-execution-role"
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
        {
            Action = "sts:AssumeRole",
            Effect = "Allow",
            Sid = "",
            Principal = {
            Service = "ecs-tasks.amazonaws.com"
            }
        }]
    })
}

resource "aws_iam_role" "ecs_task_role" {
    name = "${var.service_name}-ecsTaskRole"

    assume_role_policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
            {
                Action = "sts:AssumeRole",
                Principal = {
                    Service = "ecs-tasks.amazonaws.com"
                },
                Effect = "Allow",
                Sid = ""
            }
        ]
    })
}

resource "aws_iam_role_policy_attachment" "ecs-task-execution-role-policy-attachment" {
    role       = aws_iam_role.ecs_task_execution_role.name
    policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "cloudwatch_logs_policy" {
    statement {
        actions = [
        "logs:CreateLogStream",
        "logs:CreateLogGroup",
        "logs:DescribeLogStreams",
        "logs:PutLogEvents"
        ]

        resources = [
        "${aws_cloudwatch_log_group.containers.arn}:*"
        ]
    }
}

resource "aws_iam_policy" "cloudwatch_logs_policy" {
    path   = "/ecs/task-role/"
    policy = data.aws_iam_policy_document.cloudwatch_logs_policy.json
}

resource "aws_iam_role_policy_attachment" "cloudwatch_logs_policy" {
    role       = aws_iam_role.ecs_task_role.name
    policy_arn = aws_iam_policy.cloudwatch_logs_policy.arn
}