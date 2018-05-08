FROM shoppinpal/node:4.6
MAINTAINER Sayan Bhattacharya sayan@shoppinpal.com
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update && apt-get -y dist-upgrade && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*
RUN mkdir -p /apps/docker-loopback
WORKDIR /apps/docker-loopback
COPY package.json /apps/docker-loopback/package.json
RUN npm install
RUN mv /apps/docker-loopback/node_modules /apps/node_modules
COPY . /apps/docker-loopback
EXPOSE 3000
CMD [ "node","server/server.js" ]
