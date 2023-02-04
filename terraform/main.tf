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

  acm_certificate_arn = var.certificate_arn
  s3_bucket_domain_name = module.s3_bucket.s3_bucket_domain_name
  s3_regional_domain_name = module.s3_bucket.s3_regional_domain_name
  s3_bucket_arn = module.s3_bucket.s3_bucket_arn
  s3_bucket_id = module.s3_bucket.s3_bucket_id

  depends_on = [
    module.s3_bucket
  ]
}
