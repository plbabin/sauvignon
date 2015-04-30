import React from 'react';
import { RouteHandler } from 'react-router';
import Header from '../components/header.jsx'
import { Link } from 'react-router';

class App extends React.Component {
  
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app__content content">
          <RouteHandler/>
        </div>
        <nav className="app__nav nav">
          <ul className="nav__list">
            <li className="nav__element nav__element--products"><Link to="products">Products</Link></li>
            <li className="nav__element nav__element--add"><Link to="add">Add</Link></li>
            <li className="nav__element nav__element--stores"><Link to="store">Store</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
  
}

export default App;