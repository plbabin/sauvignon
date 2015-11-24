import Immutable from 'immutable';
import { combineReducers } from 'redux'
import { ADD_PRODUCT, 
         UPDATE_PRODUCT, 
         DELETE_PRODUCT,
         PRODUCT_SEARCH_REQUEST,
         PRODUCT_SEARCH_SUCCESS,
         PRODUCT_SEARCH_FAILURE,
         PRODUCT_SEARCH_CLEAR,
         SET_FILTER,
         SET_SORT } from '../constants/ProductTypes'

const defaultState = {
  items_ordered_ids:new Immutable.List(),
  items: new Immutable.Map(),
  
  search_items: new Immutable.Map(),
  search_items_ordered_ids: new Immutable.List(),

  isFetching: false,
  sort:null,
  filter:null
}

export default function product(state = defaultState, action) {
  switch(action.type) {

    case ADD_PRODUCT:
      return state.concat(action.res.data.text);
    case UPDATE_PRODUCT:
      return state.set(action.id, action.text);
    case DELETE_PRODUCT:
      return state.delete(action.id);

    case PRODUCT_SEARCH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case PRODUCT_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        search_items: new Immutable.Map(action.response.entities.products),
        search_items_ordered_ids:new Immutable.List(action.response.result)
      })
    case PRODUCT_SEARCH_FAILURE:
    case PRODUCT_SEARCH_CLEAR:
      return Object.assign({}, state, {
        isFetching: false,
        search_items: new Immutable.Map(),
        search_items_ordered_ids:new Immutable.List()
      })
    case SET_FILTER:
      return state;
    case SET_SORT:
      return state;
    default:
      return state;
  }
}