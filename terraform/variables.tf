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

variable "app_domain_name" {
  type        = string
  description = "Domain name"
}

# Web App
variable "app_web_s3_bucket_name" {
  description = "S3 Bucket for React Application"
  type        = string
}

# Cloudfront
variable "certificate_arn" {
  description = "SSL ARN"
  type = string
}

# Route 53
variable "zone_id" {
  type        = string
  description = "The ID of the hosted zone to contain this record"
}

# Github Action
variable "github_iam_user" {
  type = string
  description = "AWS IAM user to run github action"
}
