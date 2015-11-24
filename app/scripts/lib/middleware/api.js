import { Schema, arrayOf, normalize } from 'normalizr'
import 'isomorphic-fetch'

const API_ROOT = 'http://sauvignon-app.com/api/v1/';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, params = {}, opts = {}) {
  const fullUrl = getUrl(endpoint, params);

  return fetch(fullUrl, opts)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return normalize(json, schema);
    })
}

function getUrl(endpoint, params = {}){
  let url = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  if (params) {
    var params_string = [];
    Object.keys(params).forEach((key)=> {
      let obj = params[key];
      params_string.push(key+'='+obj);
    });

    if(url.indexOf('?') === -1){
      url += '?';
    }
    
    url += params_string.join('&');
  
  }
  return url;
}

function postApi(endpoint, data, schema) {
  return callApi( endpoint, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

const productSchema = new Schema('products', {
  idAttribute: 'id'
})

const storeSchema = new Schema('stores', {
  idAttribute: 'id'
})

// repoSchema.define({
//   owner: userSchema
// })

// Schemas for API responses.
export const Schemas = {
  PRODUCT: productSchema,
  PRODUCT_ARRAY: arrayOf(productSchema),
  STORE: storeSchema,
  STORE_ARRAY: arrayOf(storeSchema)
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, params } = callAPI
  const { schema, types } = callAPI

  if(!params) params = {};

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, schema, params).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}