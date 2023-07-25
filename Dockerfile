FROM node:20-slim

RUN apt-get update && apt-get install -y bash

RUN npm i -g @nestjs/cli@7.4.1

USER node

CMD ["tail", "-f", "/dev/null"]

WORKDIR /home/node/app