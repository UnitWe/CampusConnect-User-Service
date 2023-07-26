FROM node:19-slim

RUN apt-get update -y && apt-get install -y openssl

RUN npm i -g @nestjs/cli@7.4.1

USER node

CMD ["tail", "-f", "/dev/null"]

WORKDIR /home/node/app