# Trak UI

## Sonar

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BenSlabbert_trak_ui&metric=alert_status)](https://sonarcloud.io/dashboard?id=BenSlabbert_trak_ui)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=BenSlabbert_trak_ui&metric=code_smells)](https://sonarcloud.io/dashboard?id=BenSlabbert_trak_ui)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=BenSlabbert_trak_ui&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=BenSlabbert_trak_ui)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=BenSlabbert_trak_ui&metric=security_rating)](https://sonarcloud.io/dashboard?id=BenSlabbert_trak_ui)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=BenSlabbert_trak_ui&metric=sqale_index)](https://sonarcloud.io/dashboard?id=BenSlabbert_trak_ui)

### Running Sonar

`yarn run sonar-scanner -Dsonar.login=$YOUR_SONAR_ACCESS_TOKEN`

### Generate gRPC

`grpc_tools_node_protoc --js_out=import_style=commonjs,binary:proto/ --grpc_out=proto/ --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` proto/proto.proto`
