FROM node:20-slim

RUN apt-get -y update
RUN apt-get -y install build-essential
RUN apt-get -y install curl

RUN npm i -g @nestjs/cli@7.4.1

CMD ["tail", "-f", "/dev/null"]

WORKDIR /app