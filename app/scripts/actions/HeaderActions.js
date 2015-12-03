import {
  SET_HEADER_TITLE, 
  SET_HEADER_LEFT_BUTTON, 
  SET_HEADER_RIGHT_BUTTON
} from '../constants/HeaderTypes'

export function setHeaderTitle(title){
  return {
    type: SET_HEADER_TITLE,
    title
  }
}

export function setHeaderLeftButton(leftButton){
  return {
    type: SET_HEADER_LEFT_BUTTON,
    leftButton
  }
}

export function setHeaderRightButton(rightButton){
  return {
    type: 'SET_HEADER_RIGHT_BUTTON',
    rightButton
  };
}