import React from 'react';
import { Route, RouteHandler, Link } from 'react-router';

import { connect }            from 'react-redux';
import { pushState, replaceState } from 'redux-router';
import { bindActionCreators } from 'redux'

import HeaderContainer from '../containers/header_container';
import ModalContainer from '../containers/modal_container';

import Navigation from '../components/navigation';

import RouteCSSTransitionGroup from '../lib/RouteCSSTransitionGroup'

class AppContainer extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {isAddScreenActive: false};

    let {location} = this.props;
    
    // IF MODAL, return to where you should be
    this.hideModal();
  }

  componentWillReceiveProps(nextProps){
    if ((
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children
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
    dispatch(pushState({modal:true, key: 'product-add', returnTo: this.props.location.pathname}, '/products/add'));
  }

  hideModal(e){

    if(e){
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }

    const { location } = this.props;

    if(location.state && location.state.modal){
      let pathname = '/';
      if(location.state.returnTo){
        pathname = location.state.returnTo;
      }

      const { dispatch } = this.props;
      dispatch(replaceState(null, pathname));
    }
    
  }

  getCurrentTransition(){
    let { location } = this.props;
    
    if (location){
      switch(location.key){
        case 'product-add':
          return 'page-transition'; //no transition for the content, it will be handle in the modal container
      }
    }

    return 'page-transition__toggle';
  }

  render() {
    let { location } = this.props

    let isModal = (
      location && 
      location.state &&
      location.state.modal &&
      this.previousChildren
    )

    //var name = this.context.router.getCurrentPath();
    return (
      <div className="page__container">
        <HeaderContainer />
        <RouteCSSTransitionGroup
          component="div" className="page__container__content page-transition" transitionName={this.getCurrentTransition()}
          transitionEnterTimeout={500} transitionLeaveTimeout={500}
        >
          {isModal ?
            this.previousChildren :
            this.props.children
          }
        </RouteCSSTransitionGroup>
        <Navigation {...this.state} onClickProductAdd={this.showProductAddModal.bind(this)} />
        
        {isModal && (
          <ModalContainer returnTo={location.state.returnTo} isFullscreen={true} onHide={this.hideModal.bind(this)}>
            {this.props.children}
          </ModalContainer>
        )}

      </div>
    );
  }
  
}

function mapDispatchToProps(dispatch) {
  return {dispatch}
}

export default connect(
  (state) => ({
    router: state.router
  }),
  mapDispatchToProps
)(AppContainer)