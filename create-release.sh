#!/usr/bin/env bash

# Run this manually

# Tag code
TAG=v1.1.4
GITHUB_USER=BenSlabbert
# ENV VAR: $GITHUB_PASS

git tag -a $TAG -m "Test release"
git push https://$GITHUB_USER:"$GITHUB_PASS"@github.com/BenSlabbert/trak-ui.git --tags

#build bundle
yarn build
cd build || exit
zip -r ui.zip .
cd ..

# Define variables.
OWNER=BenSlabbert
REPO=trak-ui

UPLOAD_FILE_PATH=./build/ui.zip
GH_API="https://api.github.com"
GH_REPO="$GH_API/repos/$OWNER/$REPO"
GH_TAGS="$GH_REPO/releases/tags/$TAG"
AUTH="Authorization: token $GH_TOKEN"

# Create the release
STATUSCODE=$(curl --silent --output /dev/stderr --write-out "%{http_code}" \
  -X POST \
  $GH_API/repos/$OWNER/$REPO/releases \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H "$AUTH" \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Host: api.github.com' \
  -H 'cache-control: no-cache' \
  -d '{
  "tag_name": "'$TAG'",
  "target_commitish": "master",
  "name": "'$TAG'",
  "body": "Description of the release",
  "draft": false,
  "prerelease": false
}')

if test "$STATUSCODE" -ne 201; then
    echo "Failed to create release HTTP status code: $STATUSCODE"
    exit 1
fi

# Read asset tags.
echo "GH_TAGS: $GH_TAGS"
response=$(curl "$GH_TAGS")

# Get ID of the asset based on given filename.
eval "$(echo "$response" | grep -m 1 "id.:" | grep -w id | tr : = | tr -cd '[[:alnum:]]=')"

[ "$id" ] || { echo "Error: Failed to get release id for tag: $TAG"; echo "$response" | awk 'length($0)<100' >&2; exit 1; }

echo "Release ID: $id"

# Upload asset
echo "Uploading asset... "

# Construct url
GH_ASSET="https://uploads.github.com/repos/$OWNER/$REPO/releases/$id/assets?name=ui.zip"

curl "$GITHUB_OAUTH_BASIC" --data-binary @"$UPLOAD_FILE_PATH" -H "Authorization: token $GH_TOKEN" -H "Content-Type: application/octet-stream" "$GH_ASSET"

rm -rf build
