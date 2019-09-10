FROM debian:stretch-slim

RUN apt-get update -yq \
&& apt-get install curl gnupg jq -yq \
&& curl -sL https://deb.nodesource.com/setup_10.x | bash - \
&& apt-get install -yq nodejs