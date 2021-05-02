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