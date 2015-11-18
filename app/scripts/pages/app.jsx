import React from 'react';
import Header from '../components/header.jsx';
import Navigation from '../components/navigation.jsx';
import AddScreenSelector from '../components/add_screen_selector.jsx';
import { Route, RouteHandler, Link } from 'react-router';
import RouteCSSTransitionGroup from '../lib/RouteCSSTransitionGroup'

class App extends React.Component {
  
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
        <Header />
        <RouteCSSTransitionGroup
          component="div" className="app__content content page-transition" transitionName="page-transition__toggle"
          transitionEnterTimeout={500} transitionLeaveTimeout={500}
        >
          {this.props.children}
        </RouteCSSTransitionGroup>
        <Navigation isAddScreenActive={this.state.isAddScreenActive} addScreenOnClick={this.toggleAddScreen.bind(this)} />
        <AddScreenSelector isActive={this.state.isAddScreenActive} toggleModal={this.toggleAddScreen.bind(this)} />
      </div>
    );
  }
  
}

App.contextTypes = {
  history: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired
}

export default App;