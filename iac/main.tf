provider "aws" {
  region = var.aws_region
}


locals {
  s3_origin_id = "s3-green-stocks"
}

resource "aws_s3_bucket" "green-stocks-s3-bucket" {
  bucket = var.bucket_name
  acl = "public-read"
  policy = data.aws_iam_policy_document.s3-website-policy.json

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "green-stocks-s3-access-control" {
  bucket = aws_s3_bucket.green-stocks-s3-bucket.id

  block_public_acls   = true
  ignore_public_acls = true
}
