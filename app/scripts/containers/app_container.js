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
import {NAV_ANIMATION_MODAL} from '../constants/NavTypes'

import classnames from 'classnames';

class AppContainer extends React.Component {
  
  constructor(props){
    super(props);

    let {location} = this.props;
    
    // IF MODAL, return to where you should be
    this.handleReload();
  }

  componentWillReceiveProps(nextProps){
    const {location} = nextProps;
    if(location && 
       location.state && 
       location.state.animation === NAV_ANIMATION_MODAL && 
       !location.state.closing){
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

    const { dispatch } = this.props;
    //let location = this.props.history.createLocation('/products/add', {modal:true}, null, 'product-add');
    //this.props.history.transitionTo(location);
    dispatch( pushState({
        animation:NAV_ANIMATION_MODAL, 
        fullscreen:true,
        returnTo:this.props.location,
        closing:false
      }, '/products/add')
    );
  }

  handleReload(){
    const { location,history,dispatch } = this.props;

    if(this.props.history.isActive('/products/add')){
        dispatch(replaceState(null, '/'));
    } 
  }

  getCurrentTransition(){
    let animation = 'toggle';
    let { location } = this.props;
    
    if (location && location.state && location.state.animation){
      animation = location.state.animation
    }

    return `page-transition__${animation}`;
  }

  getTransitionLeaveStatus(){
    const { location } = this.props;
    let status = true;

    if (location && location.state && location.state.animation){
      if(location.state.animation === NAV_ANIMATION_MODAL && location.state.open){
        status = false;
      }
    }

    return status;
  }

  getTransitionEnterStatus(){
    const { location } = this.props;
    let status = true;

    if (location && location.state && location.state.animation){
      if(location.state.animation === NAV_ANIMATION_MODAL && !location.state.open){
        status = false;
      }
    }

    return status;
  }

  getContainerClass(){
    const {location} = this.props;
    return classnames(
      'page-container',
      {'page-container--fullscreen':(location && location.state && location.state.fullscreen)}
    );
  }

  getComponentClassname(){
    const {location} = this.props;
    return classnames(
      'page-container__content-wrapper',
      'page-transition',
      {'page-transition--is-closing':(location && location.state && location.state.closing)}
    );
  }

  render() {
    return (
      <div className={this.getContainerClass()}>
        <HeaderContainer />
        <RouteCSSTransitionGroup
          component="div"
          className={this.getComponentClassname()} 
          transitionName={this.getCurrentTransition()}
          transitionEnterTimeout={200} 
          transitionLeaveTimeout={200}
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