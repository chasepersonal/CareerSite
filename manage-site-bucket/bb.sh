# !/bin/bash
# Created 5/1/2021
# This program will create a bucket that can host a website
# using terraform

# Get bucket name and action type from command line
bucket = $1
action = $2

# Set the main path
main_path = $(pwd)

# Generate errors if required environment items are not included/provided
function env-check {
    if [[ ! -z ${bucket} ]]; then
        echo "Bucket name not provided. Please provide a bucket name for the first value"
        echo "ex: bb.sh test-bucket create"
        echo "In the above example, 'test-bucket' will refer to the bucket name"
        exit 1
    fi

    if [[ !-z ${action} ]]; then
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
    elif [[ $(which terraform) == "" ]];
        echo "Terraform is not installed"
        echo "Please install terraform before running again"
        exit 1
    elif [[ $(which aws) == "" ]];
        echo "aws cli is not installed"
        echo "Please install aws cli before running again"
        exit 1
    fi
}

# Perform the necessary actions on the bucket
function bucket-actions {
    # Check if bucket exists before taking any action
    if [[ $(aws s3 ls ${bucket}) != "" ]]; then
        echo "Bucket exists! Nothing needs to be done. Exiting script"
        exit 0
    else
        echo "Bucket does not exist. Will take appropriate action"
        if [[ ${action} == "create" ]]; then
            if [[ $(aws s3 ls careersite-state) != "" ]]; then
                create-main-bucket
            else
                create-state-bucket
                create-main-bucket-with-state
            fi
        else
            destroy-main-bucket
        fi
}

# Create state bucket using terraform
function create-state-bucket {
    cd ${main_path}/state-bucket
    terraform init
    terraform apply --auto-approve
    mv terraform.tfstate ${main_path}/main-bucket/terraform.tfstate
}

# Create main website bucket using terraform
# This will also build the state if it doesn't exist
function create-main-bucket-with-state {
    cd ${main_path}/main-bucket
    # Edit the policy.json to have the bucket name
    sed -i -e 's/<insert-bucket-name-here>/${bucket}/g' policy.json
    # Edit the main.tf to have the bucket name for the backend
    sed -i -e 's/<insert-bucket-name-here>/${bucket}/g' main.tf
    # Export bucket name as a terraform environment variable
    export TF_VAR_bucket_name="${bucket}"
    terraform init -force-copy
    terrform plan -out
    terraform apply -auto-approve
}

# Create the main bucket
function create-main-bucket {
    cd ${main_path}/main-bucket
    export TF_VAR_bucket_name="${bucket}"
    terrafrom init
    terrafrom plan -out
    terrafrom apply -auto-approve
}

function destroy-main-bucket {
    cd ${main_path}/main-bucket
    export TF_VAR_bucket_name="${bucket}"
    terraform init
    terraform plan -out
    terraform destroy -auto-approve
}

# Run through the function steps
env-check
bucket-actions