# !/bin/bash
# Created 5/1/2021
# This program will create a bucket that can host a website
# using terraform

# Get bucket name and action type from command line
bucket = $1
action = $2

# Generate errors if required environment items are not included/provided
function env-check {
    if [[ ! -z $bucket ]]; then
        echo "Bucket name not provided. Please provide a bucket name for the first value"
        echo "ex: bb.sh test-bucket create"
        echo "In the above example, 'test-bucket' will refer to the bucket name"
        exit 1
    fi

    if [[ !-z $action ]]; then
        echo "Action not set."
        echo "Please provide an action of create or destroy for the second value"
        echo "ex: bb.sh test-bucket create"
        echo "In the above example, 'create' will refer to the action"
        exit 1
    fi

    # Generate error if aws cli and/or terraform are not installed
    # This script will use aws cli to get bucket status
    # Terraform will be used to create the buckets
    if [[ $(which aws) == "" ]] && [[ $(which terraform) == ""  ]]; then
        echo "Terraform and aws cli is not installed"
        echo "Please install terraform aws cli before running again"
        exit 1
    else [[ $(which terraform) == "" ]];
        echo "Terraform is not installed"
        echo "Please install terraform before running again"
        exit 1
    else [[ $(which aws) == "" ]];
        echo "aws cli is not installed"
        echo "Please install aws cli before running again"
        exit 1
    fi
}

# Perform the necessary actions on the bucket
function bucket-actions {
    # Check if bucket exists before taking any action
    if [[ $(aws s3 ls $bucket) != "" ]]; then
        echo "Bucket exists! Exiting script"
        exit 1
    else
        echo "Bucket does not exist. Will take appropriate action"
        if [[ $action == "create" ]]; then
            create-main-bucket
        else
            destroy-main-bucket
        fi
}

# Create main website bucket using terraform
function create-main-bucket {
    cd main-bucket
    terraform init
    terraform apply --auto-approve
}

function create-state-bucket {
    cd state-bucket
    terraform init
    terraform apply --auto-approve
    mv tf.state ../main-bucket/tf.state
}

function destroy-main-bucket {
    cd main-bucket
    terraform destroy --auto-approve
}

# Run through all the steps
env-check
bucket-actions