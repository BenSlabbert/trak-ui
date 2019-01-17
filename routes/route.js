const logger = require('../logger/winston-mongodb');

let messages = require('trak-gRPC/src/js/proto/proto_pb');
let services = require('trak-gRPC/src/js/grpc/proto_grpc_pb');
let grpc = require('grpc');
let client = new services.HelloServiceClient(
    require('../config/routes').API_GRPC,
    grpc.credentials.createInsecure()
);

function getPromise( client, request ) {

  return new Promise(( resolve, reject ) => {
    client.hello(request, function ( err, response ) {

      if (err) {
        return reject(err);
      } else {
        return resolve(response);
      }
    });
  }).catch(e => {
    logger.error({ code: e.code, message: e.message });
    return null;
  });
}

module.exports = ( app ) => {

  app.get('/grpc',
      async ( req, res ) => {

        let request = new messages.HelloRequest();

        request.setFirstName('fname');
        request.setLastName('lname');

        let promise = await getPromise(client, request);

        if (!promise) {
          res.send({ error: 'error' });
        } else {
          res.send(promise.toObject());
        }
      });
};
