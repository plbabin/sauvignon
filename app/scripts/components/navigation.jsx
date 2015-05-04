import React from 'react';
import { Link } from 'react-router';
import NavigationElement from '../components/navigation_element.jsx';
import ButtonAddProduct from '../components/button_add_product.jsx';
import classnames from '../../bower_components/classnames/index.js';

class Navigation extends React.Component{

  constructor(props, context) {
    super(props);
  }

  getListClassName(icon) {
    return classnames(
      "nav__element", 
      "nav__element--"+icon
    );
  }

  render() {
    return (
      <nav className="app__nav nav">
        <ul className="nav__list">
          <li className={this.getListClassName('love')}>
            <NavigationElement route="loved" icon="love">Loved</NavigationElement>
          </li>
          <li className={this.getListClassName('totry')}>
            <NavigationElement route="totry" icon="totry">To-Try</NavigationElement>
          </li>
          <li className={this.getListClassName('add')}>
            <ButtonAddProduct onclick={this.props.addScreenOnClick} isActive={this.props.isAddScreenActive}>Add</ButtonAddProduct>
          </li>
          <li className={this.getListClassName('store')}>
            <NavigationElement route="stores" icon="outlets">Store</NavigationElement>
          </li>
          <li className={this.getListClassName('settings')}>
            <NavigationElement route="settings" icon="settings">Settings</NavigationElement>
          </li>
        </ul>
      </nav>
    );
  }

}

Navigation.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default Navigation;