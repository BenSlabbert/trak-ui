#!/usr/bin/env bash

yarn --cwd client build

docker build -t benjaminslabbert/trak_ui:latest .
