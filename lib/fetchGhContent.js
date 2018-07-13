const fetch = require('node-fetch')
const base64 = require('base-64')
const utf8 = require('utf8')
const decode = (encoded) => utf8.decode(base64.decode(encoded))

const createUrl = ({owner, repo, path, token}) => `https://api.github.com/repos/${owner}/${repo}/contents/${path}?access_token=${token}`

async function fetchGhContent ({owner, repo, path, token}) {
  const url = createUrl({owner, repo, path, token})
  const resp = await fetch(url)
  const json = await resp.json()
  if (!json.content) {
    throw new Error(`[FETCH_GITHUB_CONTENT_ERROR] ${JSON.stringify(json)}`)
  }
  return decode(json.content)
}

module.exports = fetchGhContent
