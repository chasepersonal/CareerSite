# Base image
FROM node:14.16.1-alpine3.13

# Create Working Directory
WORKDIR /app

# Install Python for npm gyp packages
# Add local, non-root user to run app
RUN apk add python python-dev py-pip \
    && addgroup -S local \
    && adduser -D -S local -G local \
    && chown local:local /app

# Set default user to newly created user
USER local

# Copy all files over
# For ng build --prod post install option
COPY . /app/
RUN  npm install 

CMD [ "npm", "start" ]