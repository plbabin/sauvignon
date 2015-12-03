import {
  SET_NAV_VISIBLE_STATE
} from '../constants/NavTypes'

export function showNavigation(){
  return {
    type: SET_NAV_VISIBLE_STATE,
    visible: true
  }
}

export function hideNavigation(){
  return {
    type: SET_NAV_VISIBLE_STATE,
    visible: false
  }
}