# Base image
FROM node:10.15.3-alpine

# Create Working Directory
ADD . /app
WORKDIR /app

# Add dependencies and add non-root user
COPY package.json /app/package.json
RUN npm install \
    && adduser -D angular

# Make main user non-root user
USER angular

# Add all necessary files to the main directory
COPY . /app