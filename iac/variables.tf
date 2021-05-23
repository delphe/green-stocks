variable "bucket_name" {
  default = "green-stocks"
  description = "S3 bucket containing static files for the green-stocks site."
}

variable "aws_region" {
  type = string
  default = "us-west-1"
}