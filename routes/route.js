const logger = require( '../logger/winston-mongodb' );

let messages = require( 'trak-gRPC/src/js/proto/proto_pb' );
let services = require( 'trak-gRPC/src/js/grpc/proto_grpc_pb' );

let grpc = require( 'grpc' );
let latestClientService = new services.LatestServiceClient(
    require( '../config/routes' ).API_GRPC,
    grpc.credentials.createInsecure()
);

let productClientService = new services.ProductServiceClient(
    require( '../config/routes' ).API_GRPC,
    grpc.credentials.createInsecure()
);

let searchClientService = new services.SearchServiceClient(
    require( '../config/routes' ).SEARCH_GRPC,
    grpc.credentials.createInsecure()
);

function getLatestResponse(client, request) {

  return new Promise( (resolve, reject) => {
    client.latest( request, function (err, response) {

      if (err) {
        return reject( err );
      } else {
        return resolve( response );
      }
    } );
  } ).catch( e => {
    logger.error( { code: e.code, message: e.message } );
    return null;
  } );
}

function getProductResponse(client, request) {

  return new Promise( (resolve, reject) => {
    client.product( request, function (err, response) {

      if (err) {
        return reject( err );
      } else {
        return resolve( response );
      }
    } );
  } ).catch( e => {
    logger.error( { code: e.code, message: e.message } );
    return null;
  } );
}

function getSearchProductResponse(client, request) {

  return new Promise( (resolve, reject) => {
    client.productSearch( request, function (err, response) {

      if (err) {
        return reject( err );
      } else {
        return resolve( response );
      }
    } );
  } ).catch( e => {
    logger.error( { code: e.code, message: e.message } );
    return null;
  } );
}

function getSearchBrandsResponse(client, request) {

  return new Promise( (resolve, reject) => {
    client.brandSearch( request, function (err, response) {

      if (err) {
        return reject( err );
      } else {
        return resolve( response );
      }
    } );
  } ).catch( e => {
    logger.error( { code: e.code, message: e.message } );
    return null;
  } );
}

function getSearchCategoryResponse(client, request) {

  return new Promise( (resolve, reject) => {
    client.categorySearch( request, function (err, response) {

      if (err) {
        return reject( err );
      } else {
        return resolve( response );
      }
    } );
  } ).catch( e => {
    logger.error( { code: e.code, message: e.message } );
    return null;
  } );
}

module.exports = (app) => {

  app.get( '/api/latest',
      async (req, res) => {

        let resp = await getLatestResponse( latestClientService, new messages.Empty() );

        if (!resp) {
          res.status( 400 ).send( { error: 'Error while retrieving latest products!' } );
        } else {
          res.send( resp.toObject() );
        }
      } );

  app.get( '/api/product/:productId',
      async (req, res) => {

        let productRequest = new messages.ProductRequest();

        productRequest.setProductId( req.params.productId );

        let resp = await getProductResponse( productClientService, productRequest );

        if (!resp) {
          res.status( 400 ).send( { error: 'Error while retrieving latest products!' } );
        } else {
          res.send( resp.toObject() );
        }
      } );

  app.get( '/api/search/product',
      async (req, res) => {

        let productRequest = new messages.SearchRequest();
        productRequest.setSearch( req.query.s );

        let resp = await getSearchProductResponse( searchClientService, productRequest );

        if (!resp) {
          res.status( 400 ).send( { error: 'Error while retrieving latest products!' } );
        } else {
          res.send( resp.toObject() );
        }
      } );

  app.get( '/api/search/brands',
      async (req, res) => {

        let productRequest = new messages.SearchRequest();
        productRequest.setSearch( req.query.s );

        let resp = await getSearchBrandsResponse( searchClientService, productRequest );

        if (!resp) {
          res.status( 400 ).send( { error: 'Error while retrieving latest products!' } );
        } else {
          res.send( resp.toObject() );
        }
      } );

  app.get( '/api/search/category',
      async (req, res) => {

        let productRequest = new messages.SearchRequest();
        productRequest.setSearch( req.query.s );

        let resp = await getSearchCategoryResponse( searchClientService, productRequest );

        if (!resp) {
          res.status( 400 ).send( { error: 'Error while retrieving latest products!' } );
        } else {
          res.send( resp.toObject() );
        }
      } );
};
