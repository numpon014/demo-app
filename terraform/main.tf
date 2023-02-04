terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.aws_region
}

module "s3_bucket" {
  source = "./modules/s3"

  app_name        = var.app_name
  app_environment = var.app_environment

  s3_bucket_name = var.app_web_s3_bucket_name
}

module "cloudfront" {
  source = "./modules/cloudfront"

  app_name        = var.app_name
  app_environment = var.app_environment

  s3_bucket_domain_name = module.s3_bucket.s3_bucket_domain_name
  s3_regional_domain_name = module.s3_bucket.s3_regional_domain_name
  s3_bucket_arn = module.s3_bucket.s3_bucket_arn
  s3_bucket_id = module.s3_bucket.s3_bucket_id

  acm_certificate_arn = var.certificate_arn
  aliases = [var.app_domain_name]

  depends_on = [
    module.s3_bucket
  ]
}

module "route53" {
  source = "./modules/route53"

  zone_id     = var.zone_id
  record_name = var.app_domain_name
  records = [module.cloudfront.domain_name]

  depends_on = [
    module.s3_bucket,
    module.cloudfront
  ]
}

module "iam" {
  source = "./modules/iam"

  github_iam_user = var.github_iam_user

  s3_bucket_arn = module.s3_bucket.s3_bucket_arn
  distribution_arn = module.cloudfront.distribution_arn

  depends_on = [
    module.s3_bucket,
    module.cloudfront
  ]
}
