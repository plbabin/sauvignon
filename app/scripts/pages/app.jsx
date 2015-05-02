import React from 'react';
import { RouteHandler } from 'react-router';
import Header from '../components/header.jsx';
import Navigation from '../components/navigation.jsx';
import AddScreenSelector from '../components/add_screen_selector.jsx';
import { Link } from 'react-router';

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

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app__content content">
          <RouteHandler/>
        </div>
        <Navigation isAddScreenActive={this.state.isAddScreenActive} addScreenOnClick={this.toggleAddScreen.bind(this)} />
        <AddScreenSelector isActive={this.state.isAddScreenActive} toggleModal={this.toggleAddScreen.bind(this)} />
      </div>
    );
  }
  
}

React.initializeTouchEvents(true);
export default App;