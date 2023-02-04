variable "app_name" {
  type        = string
  description = "Application Name"
}

variable "app_environment" {
  type        = string
  description = "Application Environment"
}

variable "s3_bucket_domain_name" {
  description = "The bucket domain name"
  type = string
}

variable "s3_regional_domain_name" {
  description = "The bucket region-specific domain name"
  type = string
}

variable "s3_bucket_arn" {
  description = "The ARN of the bucket"
  type = string
}

variable "s3_bucket_id" {
  description = "The name of the bucket"
  type = string
}

variable "acm_certificate_arn" {
  description = "SSL ARN"
  type = string
}
