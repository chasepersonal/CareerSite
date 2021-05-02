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
    key            = "${var.bucket_name}/terraform.tfstate"
    region         = "${var.aws_region}"
  }
}

# Configure the AWS Provider
provider "aws" {
  region 	 = "${var.aws_region}"
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
}
resource "aws_s3_bucket" "bucket" {
	bucket = "${var.bucket_name}"
	acl    = "public-read"
	policy = file("policy.json")

	# Will enable static website settings
	website {
		index_document = "index.html"
		error_document = "index.html"
	}
}