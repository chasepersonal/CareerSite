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
provider "aws" {}

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