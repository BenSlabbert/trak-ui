'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const logger = require('./logger/winston-mongodb');

let profile = process.env.NODE_ENV;
logger.info('Server running in profile: ' + profile);

logger.info('Starting Express');
const app = express();

logger.info('Adding middleware');
app.use(
    cookieSession({
      // 30 days
      maxAge: 24 * 60 * 60 * 1000,
      // randomly chooses one of these keys to encrypt
      keys: [process.env.COOKIE_KEY || keys.COOKIE_KEY]
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

if (profile === 'production' || profile === 'staging') {
  // serve react app
  app.use(express.static('client/build'));

  // send the index.html file if the request path is unknown
  // serves as a 'catch all' for routes
  const path = require('path');
  app.get('*', ( req, res ) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  // enable cors for test/dev mode
  app.use(function ( req, res, next ) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT);
logger.info('Server running at: ' + PORT);


let messages = require('./proto/proto/proto_pb');
let services = require('./proto/proto/proto_grpc_pb');

let grpc = require('grpc');

function main() {

  let client = new services.HelloServiceClient('localhost:50051',
      grpc.credentials.createInsecure());
  let request = new messages.HelloRequest();

  request.setFirstname('fname');
  request.setLastname('lname');

  client.hello(request, function ( err, response ) {

    if (err) {
      console.warn(err);
    } else {
      console.log('Greeting:', response.getGreeting());
    }
  });
}

main();
