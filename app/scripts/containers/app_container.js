import React from 'react';
import { Route, RouteHandler, Link } from 'react-router';

import { connect }            from 'react-redux';
import { pushState, replaceState } from 'redux-router';
import { bindActionCreators } from 'redux'

import HeaderContainer from '../containers/header_container';
import ModalContainer from '../containers/modal_container';

import NavigationContainer from '../containers/navigation_container';

import RouteCSSTransitionGroup from '../lib/RouteCSSTransitionGroup'

import connectHistory from '../lib/connect_history'
import {showNavigation, hideNavigation} from '../actions/nav_actions'
import {
  NAV_ANIMATION_MODAL,
  NAV_ANIMATION_SLIDE,
  NAV_ANIMATION_TOGGLE,
  NAV_PULL,
  NAV_PUSH
} from '../constants/NavTypes'

import classnames from 'classnames';

class AppContainer extends React.Component {
  
  constructor(props){
    super(props);

    let {location} = this.props;
    
    // IF MODAL, return to where you should be
    this.handleReload();
  }

  isLocationModalAndPush(){
    const {location} = this.props;
    return (location && 
       location.state && 
       location.state.animation === NAV_ANIMATION_MODAL && 
       location.state.direction === NAV_PUSH)
  }

  componentDidUpdate(){
    if(this.isLocationModalAndPush()){
      this.props.hideNavigation();
    }else{
      this.props.showNavigation();
    }
  }

  showProductAddModal(e){
    if(e){
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }

    const { history } = this.props;
    //let location = this.props.history.createLocation('/product/add', {modal:true}, null, 'product-add');
    //this.props.history.transitionTo(location);
    const state = {
      returnTo:this.props.location,
      fullscreen:true,
      direction:NAV_PUSH,
      animation: NAV_ANIMATION_MODAL
    };
    history.pushState(state, '/product/add');
  }

  handleReload(){
    const { location,history,dispatch } = this.props;

    if(this.props.history.isActive('/product/add') || (location.state && location.state.fullscreen)){
        this.props.history.replaceState(null, '/');
    } 
  }
  getAnimationFromLocation(){
    let animation = 'toggle';
    let { location } = this.props;
    
    if (location && location.state && location.state.animation){
      animation = location.state.animation
    }
    return animation;
  }

  getCurrentTransition(){
    return `page-transition__${this.getAnimationFromLocation()}`;
  }

  isContainerFullscreen(){
    const {location} = this.props;
    return (location && location.state && location.state.fullscreen);
  }

  getContainerClass(){
    return classnames(
      'page-container',
      {'page-container--fullscreen':(this.isContainerFullscreen())}
    );
  }

  getComponentClassname(){
    const {location} = this.props;
    let direction = NAV_PUSH;
    if(location.state && location.state.direction){
      direction = location.state.direction
    }
    return classnames(
      'page-container__content-wrapper',
      'page-transition',
      `page-transition--${direction}`
    );
  }

  getTransitionEnterTime(){
    switch(this.getAnimationFromLocation()){
      case NAV_ANIMATION_MODAL:
        return 250;
      case NAV_ANIMATION_SLIDE:
        return 250;
      case NAV_ANIMATION_TOGGLE:
      default:
        return 250;
    }
  }

  getTransitionLeaveTime(){
    switch(this.getAnimationFromLocation()){
      case NAV_ANIMATION_MODAL:
        return 250;
      case NAV_ANIMATION_SLIDE:
        return 400;
      case NAV_ANIMATION_TOGGLE:
      default:
        return 250;
    }
  }

  render() {
    return (
      <div className={this.getContainerClass()}>
        <HeaderContainer />
        <RouteCSSTransitionGroup
          component="div"
          className={this.getComponentClassname()} 
          transitionName={this.getCurrentTransition()}
          transitionEnterTimeout={this.getTransitionEnterTime()} 
          transitionLeaveTimeout={this.getTransitionLeaveTime()}
          transitionAppear={false}
          >
          {this.props.children}
        </RouteCSSTransitionGroup>
        <NavigationContainer onClickProductAdd={this.showProductAddModal.bind(this)} />
      </div>
    );
  }
  
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    hideNavigation: bindActionCreators(hideNavigation, dispatch),
    showNavigation: bindActionCreators(showNavigation, dispatch),
  }
}

export default connectHistory(connect(
  (state) => ({
    router: state.router
  }),
  mapDispatchToProps
)(AppContainer))