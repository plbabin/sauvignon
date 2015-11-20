import * as types from '../constants/ProductTypes';
import fetch from 'isomorphic-fetch';

export function createProduct(product){
  return {
    type: types.CREATE_PRODUCT,
    product
  }
}

export function updateProduct(id, product){
  return {
    type: types.UPDATE_PRODUCT,
    id,
    product
  }
}

export function deleteProduct(id){
  return {
    type: types.DELETE_PRODUCT,
    id
  };
}

export function parseProducts(product){

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