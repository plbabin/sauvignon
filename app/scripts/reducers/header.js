import { combineReducers } from 'redux'
import Immutable from 'immutable';

import { SET_HEADER_TITLE, 
         SET_HEADER_LEFT_BUTTON, 
         SET_HEADER_RIGHT_BUTTON } from '../constants/HeaderTypes'

const defaultState = new Immutable.Map({
  'title'       : 'default title',
  'leftButton' : false,
  'rightButton': false
});

export default function headerReducer(state = defaultState, action) {
  switch(action.type) {
    case SET_HEADER_TITLE:
      return state.set('title', action);
    case SET_HEADER_LEFT_BUTTON:
      return state.set('title', action);
    case SET_HEADER_RIGHT_BUTTON:
      return state.set('title', action);
    default:
      return state;
  }
}