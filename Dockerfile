############################################################
# Dockerfile to build NODE and Git container images
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
FROM ubuntu

# File Author / Maintainer
MAINTAINER thewillhuang

# install dependencies
RUN apt-get update && apt-get install -y \
      build-essential \
      python \
      curl \
      git;

#enable sourcing in docker
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

#install node and set node env variables for less typing
ENV NVM_DIR /usr/local/nvm

# install node
ENV NODE_VERSION v0.12
ENV NODE_BRANCH node/v0.12.2
# ENV NODE_VERSION iojs
# ENV NODE_BRANCH io.js/v1.7.1

# Install nvm and use node version defined above.
RUN git clone https://github.com/creationix/nvm.git $NVM_DIR && cd $NVM_DIR && git checkout `git describe --abbrev=0 --tags`
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \

#Set npm and node paths to allow running npm and node executables
ENV NODE_PATH $NVM_DIR/versions/$NODE_BRANCH/lib/node_modules
ENV PATH      $NVM_DIR/versions/$NODE_BRANCH/bin:$PATH

# forever for running node apps as daemons and automatically restarting on crashes
# gulp, grunt-cli, bower typical front-end stuff
RUN npm install -g forever gulp grunt-cli bower

#set WORKDIR, PORT and set Port
WORKDIR /src
ENV PORT 8080
EXPOSE $PORT

# add current directory from the host maching to docker WORKDIR
#   s  dest
ADD . ./
RUN echo "checking source directory" && cd /src && ls
RUN echo "checking source directory" && cd /src/gulp && ls
# make user and set /src as project folder with only user privelages. *running as root will make bower and npm go nuts*
RUN /usr/sbin/useradd --create-home --home-dir /usr/local/nonroot --shell /bin/bash nonroot
RUN chown -R nonroot /src
USER nonroot
ENV HOME /usr/local/nonroot

# runs below command in WORKDIR when the images is ran.
CMD npm install && forever server.js
