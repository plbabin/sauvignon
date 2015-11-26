import Immutable from 'immutable';
import { combineReducers } from 'redux'
import { ADD_PRODUCT, 
         UPDATE_PRODUCT, 
         DELETE_PRODUCT,
         PRODUCT_SEARCH_REQUEST,
         PRODUCT_SEARCH_SUCCESS,
         PRODUCT_SEARCH_FAILURE,
         SET_PRODUCT_FILTER,
         PRODUCT_SEARCH_CLEAR } from '../constants/product'

import { SET_SORT, SORT_TYPE_PRICE, SORT_ASC } from '../constants/sort'

import { sort_items } from '../lib/helpers/sorted_group'

const defaultState = {
  items_ordered:new Immutable.List(),
  items: new Immutable.List(),
  
  search_items: new Immutable.List(),
  search_items_ordered: new Immutable.List(),

  isFetching: false,
  sort_type:SORT_TYPE_PRICE,
  sort_order:SORT_ASC,
  filter:null
}
console.log('defaultState', defaultState)

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
      const products_list = (new Immutable.Map(action.response.entities.products)).toList();
      return Object.assign({}, state, {
        isFetching: false,
        search_items: products_list,
        search_items_ordered:sort_items(products_list, state.sort_type, state.sort_order)
      })
    case PRODUCT_SEARCH_FAILURE:
    case PRODUCT_SEARCH_CLEAR:
      return Object.assign({}, state, {
        isFetching: false,
        search_items: new Immutable.List(),
        search_items_ordered:new Immutable.List()
      })
    case SET_PRODUCT_FILTER:
      return state;
    case SET_SORT:
      return Object.assign({}, state, {
        items_ordered_ids: sort_items(state.items, action.sort_type),
        search_items_ordered: sort_items(state.search_items, action.sort_type)
      });
    default:
      return state;
  }
}