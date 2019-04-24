# Base image
FROM node:10.15.3-alpine

# Create Working Directory
ADD . /app
WORKDIR /app

# Add depndencies
COPY --chown user:user package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@6.0.5

# Add all necessary files to the main directory
COPY . /app