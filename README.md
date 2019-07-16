# fb_stickers_crawler

## A small script coded for crawling all Facebook stickers available in the store

## Crawler stickers: https://drive.google.com/open?id=1pZ2wM1HbgAbDO6s5TumykVwB-XFLDOSz

## Prerequisite
- NodeJS
- npm

## How to use
1. Clone/download this repo
2. `npm install`
3. Put your access_token inside config.json
4. `node index.js`

## How to get a working access_token
- Goto https://b-graph.facebook.com/auth/login?password=<URI_encoded_password>&email=<email|uid>&access_token=350685531728|62f8ce9f74b12f84c123cc23437a4a32&method=POST and copy the long access_token starts with __EAAA__ lies between those " "
