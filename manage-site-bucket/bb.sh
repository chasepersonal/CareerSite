# !/bin/bash
# Created 5/1/2021
# This program will create a bucket that can host a website
# using terraform

# Get bucket name and action type from command line
bucket=$1
action=$2

# Set the main path
main_path=$(pwd)

# Generate errors if required environment items are not included/provided
function env_check {
    if [[ -z ${bucket} ]] && [[ -z ${action} ]]; then
        echo ""
        echo "Bucket name and action to take on the bucket have not been set."
        echo "Please include both of these values."
        echo "The Bucket name should come first with the create or destroy action second"
        echo "ex: bb.sh test-bucket create"
        echo "In the above example, 'test-bucket' will refer to the bucket name"
        exit 1
    elif [[ -z ${bucket} ]]; then
        echo ""
        echo "Bucket name not provided. Please provide a bucket name for the first value"
        echo "ex: bb.sh test-bucket create"
        echo "In the above example, 'test-bucket' will refer to the bucket name"
        exit 1
    elif [[ -z ${action} ]]; then
        echo ""
        echo "Action not set."
        echo "Please provide an action of create or destroy for the second value"
        echo "ex: bb.sh test-bucket create"
        echo "In the above example, 'create' will refer to the action"
        exit 1
    fi

    # Generate error if aws cli and/or terraform are not installed
    # This script will use aws cli to get bucket status
    # Terraform will be used to create the buckets
    if [ $(which aws) == "" ] && [ $(which terraform) == ""  ]; then
        echo ""
        echo "Terraform and aws cli is not installed"
        echo "Please install terraform aws cli before running again"
        exit 1
    elif [ $(which terraform) == "" ]; then
        echo ""
        echo "Terraform is not installed"
        echo "Please install terraform before running again"
        exit 1
    elif [ $(which aws) == "" ]; then
        echo ""
        echo "aws cli is not installed"
        echo "Please install aws cli before running again"
        exit 1
    fi

    # Check if AWS Credentials have been exported
    # Fail if they havent
    if [[ ${AWS_ACCESS_KEY_ID} == "" ]] || [[ ${AWS_SECRET_ACCESS_KEY} == "" ]] || [[ ${AWS_DEFAULT_REGION} == ""]]; then
        echo ""
        echo "AWS credentials are not available"
        echo "Please export these as varaibles as follows and try again:"
        echo "export AWS_ACCESS_KEY_ID='<insert AWS access key id here>'"
        echo "export AWS_SECRET_ACCESS_KEY='<insert AWS secret key here>'"
        echo "export AWS_DEFAULT_REGION='<insert AWS default region here>'"
        exit 1
    fi
}

# Perform the necessary actions on the bucket
function bucket_actions {
    # Perform different actions depending on create or destroy
    if [[ ${action} == "create" ]]; then
        # Get return code for state
        aws s3 ls careersite-state
        state_bucket_status=$?
        # If state bucket exists, just create the main bucket
        if [ $state_bucket_status -eq 0 ]; then
            create_main_bucket
        # If state file does not exist, create both the state and main bucket
        elif [ $state_bucket_status -eq 255 ]; then
            create_state_bucket
            create_main_bucket_with_state
            i
    elif [[ ${action} == "destroy" ]]; then
        # Check if there is a state bucket
        aws s3 ls careersite-state
        state_bucket_status=$?

        # If no state bucket exists, exit with an error
        if [ $state_bucket_status -ne 0 ]; then
            echo ""
            echo "State bucket does not exist."
            echo "Will be unable to execute the destroy without a state file."
            echo "Please run script with 'create' so the state will get created"
            exit 1
        fi

        destroy_main_bucket
    fi
}

# Create state bucket using terraform
function create_state_bucket {
    cd ${main_path}/state-bucket
    terraform init
    status_check
    terraform plan
    status_check
    terraform apply -auto-approve
    status_check
    state_check
    mv terraform.tfstate ${main_path}/main-bucket/terraform.tfstate
}

# Create main website bucket using terraform
# This will also build the state if it doesn't exist
function create_main_bucket_with_state {
    cd ${main_path}/main-bucket
    prep_configurations
    # Check that the state was moved to the folder before continuing
    state_check
    terraform init -force-copy
    status_check
    terraform plan
    status_check
    terraform apply -auto-approve
    status_check
}

# Create the main bucket
function create_main_bucket {
    cd ${main_path}/main-bucket
    prep_configurations
    terraform init
    status_check
    terraform plan
    status_check
    terraform apply -auto-approve
    status_check
}

function destroy_main_bucket {
    cd ${main_path}/main-bucket
    prep_configurations
    terraform init
    status_check
    terraform plan -destroy
    status_check
    terraform apply -destroy -auto-approve
    status_check
}

function final_message {
    if [[ ${action} == "create" ]]; then
        echo ""
        echo "The following bucket was created: "
        echo "$bucket"
    elif [[ ${action} == "destroy" ]]; then
        echo ""
        echo "The following bucket was destroyed: "
        echo "$bucket"
    fi
    exit 0
}

# This function will check return code of previous action
# If not 0, will not continue and exit
function status_check {
    if [ $? -ne  0 ]; then
        echo ""
        echo "An Error occured when executing the previous action."
        echo "Exiting script."
        exit 1
    fi
}

# Check that a state file exists
# Exit program if it doesn't
function state_check {
    if [ -f "terraform.tfstate" ]; then
        echo ""
        echo "Terraform state file exists."
        echo "Continuing with the script"
    else
        echo ""
        echo "ERROR: Terraform state file does not exist"
        echo "This file should be available before continuing"
        echo "Exiting Script"
        exit 1
    fi
}

# Prep for creation/destruction of terraform
function prep_configurations {
    # Edit the policy.json to have the bucket name
    sed -i -e "s/<insert-bucket-name-here>/$bucket/g" policy.json
    # Edit the main.tf to have the bucket name for the backend
    sed -i -e "s/<insert-bucket-name-here>/$bucket/g" main.tf
    # Export bucket name as a terraform environment variable
    export TF_VAR_bucket_name="${bucket}"
}

# Run through the function steps
env_check
bucket_actions

# Return to the main directory
cd ..

# Give completion message and exit cleanly
final_message