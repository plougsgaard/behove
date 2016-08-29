/* global fetch */

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

const getOptions = (options = {}) => {
  if (options.body) {
    options.body = JSON.stringify(options.body)
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json'
    }
  }
  return options
}

const wrapFetch = async (url, options) => {
  const response = await fetch(url, options)
  const json = await response.json()
  if (json.ok) {
    return json
  }
  throw { error: json }
}

const decoratePath = (url) => `${PATH_API_BASE}/${url}`

const decorateOptions = (method = 'get', body, headers) => body
  ? {
    method,
    body: JSON.stringify(body),
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }
  : {
    method
  }

export const getRequest = async (url, body, headers) =>
  await wrapFetch(decoratePath(url), decorateOptions('get', body, headers))

export const postRequest = async (url, body, headers) =>
  await wrapFetch(decoratePath(url), decorateOptions('post', body, headers))

export const putRequest = async (url, body, headers) =>
  await wrapFetch(decoratePath(url), decorateOptions('put', body, headers))

export const deleteRequest = async (url, body, headers) =>
  await wrapFetch(decoratePath(url), decorateOptions('delete', body, headers))

// export const postRequest = async (url, options) => {
//   try {
//     const normalResponse = await fetch(decoratePath(url), getOptions(options))
//     console.log('postRequest:normalResponse', normalResponse)
//     if (normalResponse.status >= 400) {
//       throw Boom.create(normalResponse.status, normalResponse.statusText)
//     }
//   } catch (errorResponse) {
//     console.log('postRequest:errorResponse', errorResponse)
//     throw Error({ error: errorResponse })
//   }
// }

export const httpRequest = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(decoratePath(url), getOptions(options)).then(
      async (response) => {
        if (response.status >= 400) {
          try {
            reject({ error: await response.json() })
          } catch (err) {
            reject({ error: getBadRequest() })
          }
        } else {
          try {
            resolve(await response.json())
          } catch (err) {
            resolve({
              message: response.statusText
            })
          }
        }
      },
      async (response) => {
        try {
          reject({ error: await response.json() })
        } catch (err) {
          reject({ error: getServiceUnavailable() })
        }
      }
    )
  })
}
