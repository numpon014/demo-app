output "domain_name" {
  description = "Cloudfront domain name"
  value       = aws_cloudfront_distribution.react_website_cdn.domain_name
}

output "distribution_arn" {
  description = "Cloudfront ARN"
  value = aws_cloudfront_distribution.react_website_cdn.arn
}

