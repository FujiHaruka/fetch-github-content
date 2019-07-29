# fetch-github-content

[![Build Status](https://travis-ci.org/FujiHaruka/fetch-github-content.svg?branch=master)](https://travis-ci.org/FujiHaruka/fetch-github-content)
[![npm version](https://badge.fury.io/js/fetch-github-content.svg)](https://badge.fury.io/js/fetch-github-content)

## Instalation 

```
$ npm install fetch-github-content
```

## Usage

```js
const fetchGhContent = require('fetch-github-content')
fetchGhContent({
  owner: 'FujiHaruka',
  repo: 'fetch-github-content',
  path: 'package.json',
  token: 'xxx', // (Optional) Access token
  ref: 'xxx', // (Optional) The name of the commit/branch/tag
  json: true, // (Optional) if true, returns JSON.parse(content)
}).then(console.log)
```
