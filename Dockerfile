# Base image
FROM node:10.16.3-alpine

# Create Working Directory
WORKDIR /app

# Add sudo and new user with sudo priviledges
RUN apk update \
    && apk add sudo \
    && addgroup -S local \
    && adduser -D -S local -G local \
    && chown local:local /app \
    && echo "local ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers \
    && chmod 0440 /etc/sudoers

# Set default user to newly created user
USER local

# Add dependencies and add non-root user
COPY package.json /app/package.json
RUN  sudo npm install 

# Add all necessary files to the main directory
COPY . /app

EXPOSE 8080

CMD [ "node", "server.js" ]