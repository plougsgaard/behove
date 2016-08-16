import { PATH_API_BASE } from '../config'

export const getServiceUnavailable = () => ({
  isBoom: true,
  output: {
    payload: {
      error: `Service Unavailable`,
      message: `Request timed out.`,
      statusCode: 503
    }
  }
})

export const getBadRequest = () => ({
  isBoom: true,
  output: {
    payload: {
      error: `Bad Request`,
      message: `The server failed to provide a good explanation - but the request was bad anyway.`,
      statusCode: 400
    }
  }
})

const _parseUrl = (url) => {
  if (!url) {
    throw new Error(`Missing URL.`)
  }
  if (url.indexOf('http') === 0) {
    return url
  }
  if (url[0] === '/') {
    return `${PATH_API_BASE}${url}`
  }
  return `${PATH_API_BASE}/${url}`
}

const _parseOptions = (options = {}) => {
  if (options.body) {
    options.body = JSON.stringify(options.body)
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json'
    }
  }
  return options
}

export const httpRequest = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(_parseUrl(url), _parseOptions(options)).then(
      async (response) => {
        if (response.status >= 400) {
          try {
            reject({ _error: await response.json() })
          }
          catch (err) {
            reject({ _error: getBadRequest() })
          }
        } else {
          try {
            resolve(await response.json())
          }
          catch (err) {
            resolve({
              message: response.statusText
            })
          }
        }
      },
      async (response) => {
        try {
          reject({ _error: await response.json() })
        }
        catch (err) {
          reject({ _error: getServiceUnavailable() })
        }
      }
    )
  })
}
