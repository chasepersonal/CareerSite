terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "careersite-state"

  # Add this so subsequent calls won't destroy the resource
  
  lifecycle {
    prevent_destroy = true
  }
  
  # Enable versioning to keep track of state
  versioning {
    enabled = true
  }

  # Enable server-side encryption by default
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}