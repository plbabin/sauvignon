import React from 'react';
import { Route, RouteHandler, Link } from 'react-router';

import { connect }            from 'react-redux';
import { pushState }          from 'redux-router';
import { bindActionCreators } from 'redux'

import HeaderContainer from '../containers/header_container';
import Navigation from '../components/navigation';

import RouteCSSTransitionGroup from '../lib/RouteCSSTransitionGroup'

class AppContainer extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {isAddScreenActive: false};
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps);
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children
    }
  }

  toggleAddScreen(e){
    if(e){
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }

    let location = this.props.history.createLocation('/products/add', {modal:true}, null, 'product-add');
    this.props.history.transitionTo(location);
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
      <div className="app">
        <HeaderContainer />
        <RouteCSSTransitionGroup
          component="div" className="app__content content page-transition" transitionName={this.getCurrentTransition()}
          transitionEnterTimeout={500} transitionLeaveTimeout={500}
        >
          {isModal ?
            this.previousChildren :
            this.props.children
          }
        </RouteCSSTransitionGroup>
        <Navigation {...this.state} onClickToggleAddScreen={this.toggleAddScreen.bind(this)} />
      </div>
    );
  }
  
}

// function mapDispatchToProps(dispatch) {
//   return {dispatch}
// }

// export default connect(
//   (state) => ({
//     router: state.router
//   }),
//   mapDispatchToProps
// )(AppContainer)
export default AppContainer