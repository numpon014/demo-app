variable "s3_bucket_arn" {
  description = "The ARN of the bucket"
  type = string
}

variable "distribution_arn" {
  description = "Distribution ARN"
  type = string
}

variable "github_iam_user" {
  description = "AWS IAM user to run github action"
  type = string
}
