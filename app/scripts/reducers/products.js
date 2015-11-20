import Immutable from 'immutable';
import { combineReducers } from 'redux'
import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../constants/ProductTypes'

const defaultState = new Immutable.List();

export default function productReducer(state = defaultState, action) {
  switch(action.type) {
    case ADD_PRODUCT:
      return state.concat(action.res.data.text);
    case UPDATE_PRODUCT:
      return state.set(action.id, action.text);
    case DELETE_PRODUCT:
      return state.delete(action.id);
    default:
      return state;
  }
}