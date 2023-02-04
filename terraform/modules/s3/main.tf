resource "aws_s3_bucket" "static_react_bucket" {
  bucket = var.s3_bucket_name

  tags = {
    Name        = "${var.app_name}-s3"
    Environment = var.app_environment
  }
}

resource "aws_s3_bucket_acl" "example" {
  bucket = aws_s3_bucket.static_react_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "block_public_access" {
  bucket = aws_s3_bucket.static_react_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
