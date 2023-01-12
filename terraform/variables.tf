variable "service_name" {
    type = string
    description = "Name of service"
}

# variable "vpc_id" {
#     type = string
#     description = "VPC ID"
# }

variable "availability_zone" {
  type = list(string)
  description = "Availability Zones"
}

variable "image_id" {
    type = string
    description = "Image ID to pull from ECR"

    default = "latest"
}