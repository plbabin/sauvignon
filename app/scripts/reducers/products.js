import Immutable from 'immutable';
import { combineReducers } from 'redux'
import { ADD_PRODUCT, 
         UPDATE_PRODUCT, 
         DELETE_PRODUCT,
         PRODUCT_SEARCH_REQUEST,
         PRODUCT_SEARCH_SUCCESS,
         PRODUCT_SEARCH_FAILURE,
         PRODUCT_FETCH_REQUEST,
         PRODUCT_FETCH_SUCCESS,
         PRODUCT_FETCH_FAILURE,
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
  last_product_fetched:null,

  sort_type:SORT_TYPE_PRICE,
  sort_order:SORT_ASC,
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
    case PRODUCT_FETCH_REQUEST:
    case PRODUCT_SEARCH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case PRODUCT_FETCH_SUCCESS:
      const product = action.response.entities.products[action.response.result]
      return Object.assign({}, state, {
        last_product_fetched: product
      });
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
      let order = action.sort_order || state.sort_order;
      let type  = action.sort_type || state.sort_type;

      return Object.assign({}, state, {
        sort_type: type,
        sort_order: order,
        items_ordered_ids: sort_items(state.items, type, order),
        search_items_ordered: sort_items(state.search_items, type, order)
      });
    default:
      return state;
  }
}