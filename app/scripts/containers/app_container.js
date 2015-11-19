import React from 'react';
import HeaderContainer from '../containers/header_container';
import Navigation from '../components/navigation';
import AddScreenSelector from '../components/add_screen_selector';
import { Route, RouteHandler, Link } from 'react-router';
import RouteCSSTransitionGroup from '../lib/RouteCSSTransitionGroup'

class AppContainer extends React.Component {
  
  constructor(props, context){
    super(props, context);

    this.state = {isAddScreenActive: false};
  }

  toggleAddScreen(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    console.log('toggleModal');
    this.setState({isAddScreenActive:!this.state.isAddScreenActive})
  }
  getCurrentTransition(){
    // var name = this.context.router.getCurrentPath();
    // if (name === 'product-add'){
    //   console.log('here');
    // }

    return 'page-transition__toggle';
  }

  render() {
    //var name = this.context.router.getCurrentPath();

    return (
      <div className="app">
        <HeaderContainer />
        <RouteCSSTransitionGroup
          component="div" className="app__content content page-transition" transitionName="page-transition__toggle"
          transitionEnterTimeout={500} transitionLeaveTimeout={500}
        >
          {this.props.children}
        </RouteCSSTransitionGroup>
        <Navigation {...this.state} onClickToggleAddScreen={this.toggleAddScreen.bind(this)} />
        <AddScreenSelector isActive={this.state.isAddScreenActive} onToggleModal={this.toggleAddScreen.bind(this)} />
      </div>
    );
  }
  
}

AppContainer.contextTypes = {
  history: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired
}

export default AppContainer;