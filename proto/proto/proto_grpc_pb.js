// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_proto_pb = require('../proto/proto_pb.js');

function serialize_com_trak_api_proto_HelloRequest(arg) {
  if (!(arg instanceof proto_proto_pb.HelloRequest)) {
    throw new Error('Expected argument of type com.trak.api.proto.HelloRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_com_trak_api_proto_HelloRequest(buffer_arg) {
  return proto_proto_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_trak_api_proto_HelloResponse(arg) {
  if (!(arg instanceof proto_proto_pb.HelloResponse)) {
    throw new Error('Expected argument of type com.trak.api.proto.HelloResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_com_trak_api_proto_HelloResponse(buffer_arg) {
  return proto_proto_pb.HelloResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var HelloServiceService = exports.HelloServiceService = {
  hello: {
    path: '/com.trak.api.proto.HelloService/hello',
    requestStream: false,
    responseStream: false,
    requestType: proto_proto_pb.HelloRequest,
    responseType: proto_proto_pb.HelloResponse,
    requestSerialize: serialize_com_trak_api_proto_HelloRequest,
    requestDeserialize: deserialize_com_trak_api_proto_HelloRequest,
    responseSerialize: serialize_com_trak_api_proto_HelloResponse,
    responseDeserialize: deserialize_com_trak_api_proto_HelloResponse,
  },
};

exports.HelloServiceClient = grpc.makeGenericClientConstructor(HelloServiceService);
