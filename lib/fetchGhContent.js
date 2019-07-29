const fetch = require('node-fetch')
const base64 = require('base-64')
const utf8 = require('utf8')
const decode = (encoded) => utf8.decode(base64.decode(encoded))

const buildApiUrl = ({ owner, repo, path, token, ref }) => {
  const url = new URL(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
  if (token) {
    url.searchParams.set('access_token', token)
  }
  if (ref) {
    url.searchParams.set('ref', ref)
  }
  return url.toString()
}

async function fetchGhContent({ owner, repo, path, token, json = false, isDirectory = false, ref = 'master'}) {
  const url = buildApiUrl({ owner, repo, path, token, ref})
  const resp = await fetch(url)
  const respObj = await resp.json()
  if (isDirectory) {
    return respObj
  }
  if (!respObj.content) {
    throw new Error(`[FETCH_GITHUB_CONTENT_ERROR] ${JSON.stringify(respObj)}`)
  }
  const content = decode(respObj.content)
  if (json) {
    return JSON.parse(content)
  } else {
    return content
  }
}

module.exports = fetchGhContent
