FROM node:5.3
MAINTAINER Brandon Valosek <bvalosek@gmail.com>

ENV PORT 8000
EXPOSE ${PORT}/tcp

ENV APP_BASE /opt/server
WORKDIR ${APP_BASE}

COPY ./package.json ./
RUN npm install

COPY ./app ./app

CMD ["node", "./app"]

