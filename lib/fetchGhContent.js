const fetch = require('node-fetch')
const utf8 = require('utf8')

const decodeBase64 = (encoded) => Buffer.from(encoded, 'base64').toString('ascii')
const decode = (encoded) => utf8.decode(decodeBase64(encoded))

const buildApiUrl = ({ owner, repo, path, token, ref }) => {
  if (!owner) {
    throw new Error(`[FETCH_GITHUB_CONTENT_ERROR] "owner" is required.`)
  }
  if (!repo) {
    throw new Error(`[FETCH_GITHUB_CONTENT_ERROR] "repo" is required.`)
  }
  if (!path) {
    throw new Error(`[FETCH_GITHUB_CONTENT_ERROR] "path" is required.`)
  }
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
