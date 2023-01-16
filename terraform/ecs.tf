resource "aws_ecs_cluster" "cluster" {
    name = "${var.service_name}-ecs"

    setting {
        name = "containerInsights"
        value = "enabled"
    }

    configuration {
        execute_command_configuration {
            kms_key_id = aws_kms_key.current.arn
            logging    = "OVERRIDE"

            log_configuration {
                cloud_watch_encryption_enabled = true
                cloud_watch_log_group_name     = aws_cloudwatch_log_group.current.name
            }
        }
    }
}

data "aws_api_gateway_api_key" "key" {
	id = "ap3olmsbp5"
}

resource "aws_ecs_task_definition" "service_task_fargate" {
	network_mode = "awsvpc"
	family = var.service_name
	requires_compatibilities = ["FARGATE"]
	cpu = 256
	memory = 512
	execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  	task_role_arn            = aws_iam_role.ecs_task_role.arn
	container_definitions = jsonencode([{
		name = var.service_name
        image = "public.ecr.aws/k2e0r2l1/resume:${var.image_id}"
		environment = [
			{
				name = "API_KEY"
				value = data.aws_api_gateway_api_key.key.value
			}
		]
	  	logConfiguration = {
		  logDriver = "awslogs",
		  options   = {
			awslogs-group         = "/aws/ecs/${var.service_name}"
			awslogs-region        = "us-east-1"
			awslogs-create-group  = "true"
			awslogs-stream-prefix = var.service_name
		  }
		}
		portMappings = [{
			protocol="tcp"
			containerPort=3000
			hostPort=3000
		}]}
	])
}

resource "aws_ecs_service" "ecs_service" {
  name = "${var.service_name}-service"
  cluster = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.service_task_fargate.arn
  desired_count = 1
  launch_type = "FARGATE"

  network_configuration {
    subnets = [aws_subnet.subnet1.id, aws_subnet.subnet2.id]
    assign_public_ip = true
	security_groups = [aws_security_group.ecs_tasks.id]
  }

 load_balancer {
	target_group_arn = aws_alb_target_group.target_group.arn
	container_name = var.service_name
	container_port = 3000
 }
}