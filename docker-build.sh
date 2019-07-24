#!/usr/bin/env bash

VERSION=1.0.4-$(date +%s)

echo "Building ui with docker tag: ${VERSION}"

echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USERNAME" --password-stdin

docker build -t benjaminslabbert/trak_ui:1.0.2-${VERSION}
docker push benjaminslabbert/trak_ui:1.0.2-${VERSION}
