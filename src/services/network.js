/* global fetch */

import { PATH_API_BASE } from '../config'

const wrapFetch = async (url, options) => {
  const response = await fetch(url, options)
  const json = await response.json()
  if (response.ok) {
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
