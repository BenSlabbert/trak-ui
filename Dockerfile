FROM node:10.15-alpine

RUN apk update && apk upgrade && apk add --no-cache bash git openssh

ARG NODE_ENV=docker
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT

RUN npm i npm@6.9.0 -g && npm i node-pre-gyp -g && apk --no-cache add yarn

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN yarn install

ENV PATH node_modules/.bin:$PATH

EXPOSE 3000

USER node

CMD ["npm", "start" ]
