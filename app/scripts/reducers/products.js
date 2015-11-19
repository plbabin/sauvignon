import Immutable from 'immutable';
import { combineReducers } from 'redux'
import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../constants/ProductTypes'

const defaultState = new Immutable.List();

export default function productReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_TODOS':
      return state.concat(action.res.data);
    case 'CREATE_TODO':
      return state.concat(action.res.data.text);
    case 'EDIT_TODO':
      return state.set(action.id, action.text);
    case 'DELETE_TODO':
      return state.delete(action.id);
    default:
      return state;
  }
}