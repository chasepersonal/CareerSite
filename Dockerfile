# Base image
FROM node:10.24.1-buster-slim

# Create Working Directory
WORKDIR /app

# Install Python for npm gyp packages
# Add local, non-root user to run app
RUN apt-get update \
    && apt-get install python python-pip -y \
    && adduser local \
    && chown local:local /app

# Set default user to newly created user
USER local

# Copy all files over
# For ng build --prod post install option
COPY . /app/
RUN  npm install 

CMD [ "npm", "start" ]