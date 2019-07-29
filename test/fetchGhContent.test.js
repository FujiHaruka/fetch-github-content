'use strict'

const assert = require('assert').strict
const fetchGhContent = require('../lib/fetchGhContent')

describe('fetchGhContent', function() {
  this.timeout(10000)

  it('works', async () => {
    const pkg = await fetchGhContent({
      owner: 'FujiHaruka',
      repo: 'fetch-github-content',
      path: 'package.json'
    })
    assert.equal(JSON.parse(pkg).name, 'fetch-github-content')
  })

  it('json option', async () => {
    const pkg = await fetchGhContent({
      owner: 'FujiHaruka',
      repo: 'fetch-github-content',
      path: 'package.json',
      json: true,
    })
    assert.equal(pkg.name, 'fetch-github-content')
  })
})
