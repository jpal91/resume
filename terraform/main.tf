terraform {
  required_version = ">= 1.0.11"
  
  backend "s3" {
    bucket = "tf-resume-fe-state"
    key = "terraform.tfstate"
    region = "us-east-1"
    encrypt = true
  }

  required_providers {
		aws = {
			source  = "hashicorp/aws"
			version = "~> 3.68.0"
		}
		random = {
			source  = "hashicorp/random"
			version = "~> 3.1.0"
		}
  }
}

provider "aws" {
  region = "us-east-1"

  default_tags = {
    Project = "resume"
  }
}

resource "aws_kms_key" "current" {
  description             = "${var.service_name}-ecs kms key"
  deletion_window_in_days = 7
}