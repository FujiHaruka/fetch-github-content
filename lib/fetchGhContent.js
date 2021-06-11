const fetch = require('node-fetch')

const decode = (encoded) => Buffer.from(encoded, 'base64').toString()

const buildApiUrl = ({ owner, repo, path, ref }) => {
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
  if (ref) {
    url.searchParams.set('ref', ref)
  }
  return url.toString()
}

async function fetchGhContent({ owner, repo, path, token, json = false, isDirectory = false, ref = 'master'}) {
  const url = buildApiUrl({ owner, repo, path, ref})
  const options = token ? {
    headers: {
      'Authorization': `token ${token}`
    }
  } : {}
  const resp = await fetch(url, options)
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
