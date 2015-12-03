import Immutable from 'immutable';

import {
  SET_NAV_VISIBLE_STATE
} from '../constants/NavTypes'

const defaultState = new Immutable.Map({
  'visible' : true
});

export default function nav(state = defaultState, action) {
  switch(action.type) {
    case SET_NAV_VISIBLE_STATE:
      if(state.visible === action.visible){
        return state;
      }
      return state.set('visible', action.visible);
    default:
      return state;
  }
}