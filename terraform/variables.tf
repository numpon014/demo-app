variable "aws_region" {
  type        = string
  description = "AWS Region"
}

# App
variable "app_name" {
  type        = string
  description = "Application Name"
}

variable "app_environment" {
  type        = string
  description = "Application Environment"
}

# Web App
variable "app_web_s3_bucket_name" {
  description = "S3 Bucket for React Application"
  type        = string
}
