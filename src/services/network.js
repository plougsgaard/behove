/* global fetch */

import { PATH_API_BASE } from '../config'

/**
 * Wrapper around `fetch`.
 *
 * Throws if the `response` is unsuccessful ~ ![200;300)
 * Also throws (implicitly) if there isn't a JSON body to parse.
 */
const wrapFetch = async (url, options) => {
  const response = await fetch(url, options)
  const json = await response.json()
  if (response.ok) {
    return json
  }
  throw Error({ error: json })
}

const decoratePath = (url) => `${PATH_API_BASE}/${url}`

/**
 * Builds options for the `fetch` function.
 *
 * - Add content type `application/json`
 * - Stringify the `body` if present
 */
const decorateOptions = (method = 'get', body, headers) => ({
  method,
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  ...(body ? { body: JSON.stringify(body) } : {})
})

export const getRequest = async (url, body, headers) =>
  await wrapFetch(decoratePath(url), decorateOptions('get', body, headers))

export const postRequest = async (url, body, headers) =>
  await wrapFetch(decoratePath(url), decorateOptions('post', body, headers))

export const putRequest = async (url, body, headers) =>
  await wrapFetch(decoratePath(url), decorateOptions('put', body, headers))

export const deleteRequest = async (url, body, headers) =>
  await wrapFetch(decoratePath(url), decorateOptions('delete', body, headers))

/**
 * Helper function to build authenticated request functions.
 *
 * @param  {function} asyncRequestFunction - request function
 * @param  {string} token - API token
 * @return {function} request function embedding the token as a header
 */
const authenticated = (asyncRequestFunction, token) => async (url, body, headers) =>
  await asyncRequestFunction(url, body, { ...headers, token })

export const authenticatedGetRequest = (token) => authenticated(getRequest, token)
export const authenticatedPostRequest = (token) => authenticated(postRequest, token)
export const authenticatedPutRequest = (token) => authenticated(putRequest, token)
export const authenticatedDeleteRequest = (token) => authenticated(deleteRequest, token)
