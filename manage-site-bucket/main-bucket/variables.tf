variable "bucket_name" {
    type        = string
    description = "Name of the bucket to create."
}

variable "aws_region" {
    type        = string
    default     = "us-east-1"
    description = "AWS region to use."
}