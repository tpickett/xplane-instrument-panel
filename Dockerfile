FROM ubuntu:14.04

MAINTAINER Griffith T. Pickett <pickett65@gmail.com>

# Set environment variables.
ENV NODE_ENV development
ENV APP_PATH /usr/local/src/manager

#--- NODEJS, NPM, GRUNT, BOWER, GIT and make directories for the application
RUN	apt-get update && apt-get install -y software-properties-common curl build-essential gcc make python-dev && \
    curl --silent --location https://deb.nodesource.com/setup_5.x | sudo bash - && \
    apt-get install --yes nodejs git-core && \
	npm install -g npm@next && \
	npm install -g grunt-cli && \
	npm install -g bower  && \
	npm i -g node-gyp && node-gyp clean && \
    mkdir ${APP_PATH}

# Add the production application
ADD ./dist ${APP_PATH}
# Set the working directory for the container
WORKDIR ${APP_PATH}
# Install production dependencies and clean up APT when done.
RUN npm install && \
	apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
# Application will be available at the following ports
EXPOSE 80
# Run this command when the container starts
CMD ["node", "server/server.js"]