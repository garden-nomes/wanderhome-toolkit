#!/usr/bin/env sh

set -e

rm -rf dist
npm run build
cd dist

git init
git checkout -b main
git add -A
git commit -m 'deploy'
git push -f https://github.com/garden-nomes/wanderhome-toolkit main:gh-pages

cd -