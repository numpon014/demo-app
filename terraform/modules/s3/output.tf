output "s3_bucket_domain_name" {
  description = "The bucket domain name"
  value       = aws_s3_bucket.static_react_bucket.bucket_domain_name
}

output "s3_regional_domain_name" {
  description = "The bucket region-specific domain name"
  value       = aws_s3_bucket.static_react_bucket.bucket_regional_domain_name
}

output "s3_bucket_arn" {
  description = "The ARN of the bucket"
  value       = aws_s3_bucket.static_react_bucket.arn
}

output "s3_bucket_id" {
  description = "The name of the bucket"
  value       = aws_s3_bucket.static_react_bucket.id
}

