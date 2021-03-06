import { CALL_API, Schemas } from '../lib/middleware/api';
import { ADD_PRODUCT, 
         UPDATE_PRODUCT, 
         DELETE_PRODUCT,
         PRODUCT_SEARCH_REQUEST,
         PRODUCT_SEARCH_SUCCESS,
         PRODUCT_SEARCH_FAILURE,
         PRODUCT_FETCH_REQUEST,
         PRODUCT_FETCH_SUCCESS,
         PRODUCT_FETCH_FAILURE,
         PRODUCT_SEARCH_CLEAR } from '../constants/product';

import { SET_SORT } from '../constants/sort';

export function createProduct(product){
  return {
    type: CREATE_PRODUCT,
    product
  }
}

export function updateProduct(id, product){
  return {
    type: UPDATE_PRODUCT,
    id,
    product
  }
}

export function deleteProduct(id){
  return {
    type: DELETE_PRODUCT,
    id
  };
}

export function fetchProduct(product_id){
  return {
    product_id,
    [CALL_API]: {
      types: [ PRODUCT_FETCH_REQUEST, PRODUCT_FETCH_SUCCESS, PRODUCT_FETCH_FAILURE ],
      endpoint: `products/${product_id}`,
      params: {},
      schema: Schemas.PRODUCT
    }
  }
}

// Fetches a list of products based on a search term
// Relies on the custom API middleware defined in ../middleware/api.js.
export function searchProduct(term) {
  
  return {
    term,
    [CALL_API]: {
      types: [ PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAILURE ],
      endpoint: `search/products`,
      params: {
        term
      },
      schema: Schemas.PRODUCT_ARRAY
    }
  }
}

export function clearSearch(){
  return {
    type: PRODUCT_SEARCH_CLEAR
  }
}

export function setSort(type, order){
  return {
    type: SET_SORT,
    sort_order: order,
    sort_type: type
  }
}

// function requestPosts(reddit) {
//   return {
//     type: GET_PRODUCT,
//     reddit
//   }
// }

// function receivePosts(reddit, json) {
//   return {
//     type: RECEIVE_POSTS,
//     reddit,
//     posts: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   }
// }

// function fetchPosts(reddit) {
//   return dispatch => {
//     dispatch(requestPosts(reddit))
//     return fetch(`http://www.reddit.com/r/${reddit}.json`)
//       .then(req => req.json())
//       .then(json => dispatch(receivePosts(reddit, json)))
//   }
// }

// function shouldFetchPosts(state, reddit) {
//   const posts = state.postsByReddit[reddit]
//   if (!posts) {
//     return true
//   } else if (posts.isFetching) {
//     return false
//   } else {
//     return posts.didInvalidate
//   }
// }

// export function fetchPostsIfNeeded(reddit) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), reddit)) {
//       return dispatch(fetchPosts(reddit))
//     }
//   }
// }