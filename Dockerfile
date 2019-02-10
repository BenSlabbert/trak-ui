FROM node:11.9-alpine

RUN apk update && apk upgrade && apk add --no-cache bash git openssh

ARG NODE_ENV=docker
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT

RUN npm i npm@latest -g

RUN apk add yarn

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN yarn install

ENV PATH node_modules/.bin:$PATH

EXPOSE 3000

USER node

CMD ["npm", "start" ]
