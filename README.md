# Trak UI

### Generate gRPC

`grpc_tools_node_protoc --js_out=import_style=commonjs,binary:proto/ --grpc_out=proto/ --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` proto/proto.proto`
