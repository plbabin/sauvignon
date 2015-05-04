import React from 'react';
import Header from '../components/header.jsx';
import Navigation from '../components/navigation.jsx';
import AddScreenSelector from '../components/add_screen_selector.jsx';
import { Route, RouteHandler, Link } from 'react-router';

var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

class App extends React.Component {
  
  constructor(props, context){
    super(props);
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
    var name = this.context.router.getCurrentPath();
    if(name == 'product-add'){
      alert('here');
    }

    return 'page-transition__toggle';
  }

  render() {
    var name = this.context.router.getCurrentPath();

    return (
      <div className="app">
        <Header />
        <TransitionGroup component="div" className="app__content content page-transition" transitionName={this.getCurrentTransition()}>
          <RouteHandler key={name} {...this.props} />
        </TransitionGroup>
        <Navigation isAddScreenActive={this.state.isAddScreenActive} addScreenOnClick={this.toggleAddScreen.bind(this)} />
        <AddScreenSelector isActive={this.state.isAddScreenActive} toggleModal={this.toggleAddScreen.bind(this)} />
      </div>
    );
  }
  
}

App.contextTypes = {
  router: React.PropTypes.func
}

React.initializeTouchEvents(true);
export default App;