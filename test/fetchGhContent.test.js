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
    const json = await fetchGhContent({
      owner: 'FujiHaruka',
      repo: 'fetch-github-content',
      path: 'test/data/foo.json',
      json: true,
    })
    assert.equal(json.name, 'fetch-github-content')
  })

  it('unicode', async () => {
    const json = await fetchGhContent({
      owner: 'FujiHaruka',
      repo: 'fetch-github-content',
      path: 'test/data/unicode.json',
      json: true,
    })
    assert.equal(json.name, 'ユニコードにも対応する')
  })

  it('throws error if required fields are lack', async () => {
    await assert.rejects(() => fetchGhContent({
      owner: 'FujiHaruka',
      repo: 'fetch-github-content',
    }))
  })
})
