terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    # Replace this with your bucket name!
    bucket         = "careersite-state"
    key            = "test.chaseweyer.com/terraform.tfstate"
    region         = "us-east-1"
  }
}

# Configure the AWS Provider
# All items will be imported through environment variables
provider "aws" {}

# Needed so no changes are made to the terraform state bucket
# Will find a better way in the future
resource "aws_s3_bucket" "terraform_state" {

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

}

resource "aws_s3_bucket" "bucket" {
	bucket = "${var.bucket_name}"
	acl    = "public-read"
	policy = file("policy.json")

  # Force the destruction of a bucket
	# Will not destroy unless this is present
	force_destroy = true

	# Will enable static website settings
	website {
		index_document = "index.html"
		error_document = "index.html"
	}
}