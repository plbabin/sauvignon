import React from 'react';
import { Link } from 'react-router';
import HeaderActions from '../actions/headerActions';

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

class Header extends React.Component{

  constructor(props, context) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    let leftButton = '';
    if(this.props.header.get('leftButton')){
      leftButton = this.props.header.get('leftButton');
    }
    let rightButton = '';
    if(this.props.header.get('rightButton')){
      rightButton = this.props.header.get('rightButton');
    }
    return (
      <header className="clearfix app__header header">
        <div className="header__button">
          {leftButton}
        </div>
        <h2 className="header__title">{this.props.header.get('title')}</h2> 
        <div className="header__button">
          {rightButton}
        </div> 
      </header>
    );
  }

}

export default connect(
  state => ({
    header: state.header
  })
)(Header)