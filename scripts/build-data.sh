#!/bin/sh

rm -rf ./src/json/*.json
mkdir -p ./src/json

for f in data/*.yaml; do
    npx js-yaml $f > ./src/json/$(basename $f .yaml).json
done