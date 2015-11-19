import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component{

  constructor(props, context) {
    super(props);
  }

  render() {
    let leftButton = '';
    if(this.props.leftButton){
      leftButton = this.props.leftButton;
    }
    let rightButton = '';
    if(this.props.rightButton){
      rightButton = this.props.rightButton;
    }

    return (
      <header className="clearfix app__header header">
        <div className="header__button">
          {leftButton}
        </div>
        <h2 className="header__title">{this.props.title}</h2> 
        <div className="header__button">
          {rightButton}
        </div> 
      </header>
    );
  }

}

Header.propTypes = {
  leftButton: React.PropTypes.any.isRequired,
  title: React.PropTypes.string.isRequired,
  rightButton: React.PropTypes.any.isRequired
}

export default Header;