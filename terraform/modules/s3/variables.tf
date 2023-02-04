variable "app_name" {
  type        = string
  description = "Application Name"
}

variable "app_environment" {
  type        = string
  description = "Application Environment"
}

variable "s3_bucket_name" {
  description = "S3 Bucket for IAM to access"
  type        = string
}
