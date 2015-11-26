import Immutable from 'immutable';
import { combineReducers } from 'redux'
import { SEARCH_PRODUCTS,
         PRODUCT_SEARCH_REQUEST,
         PRODUCT_SEARCH_SUCCESS,
         PRODUCT_SEARCH_FAILURE } from '../constants/product'

const defaultState = {
  ids: new Immutable.List(),
  items: new Immutable.OrderedMap(),
  isFetching: false
}

export default function productSearch(state = defaultState, action) {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case PRODUCT_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: new Immutable.OrderedMap(action.response.entities)
      })
    case PRODUCT_SEARCH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}