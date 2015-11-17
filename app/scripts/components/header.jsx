import React from 'react';
import { Link } from 'react-router';
import HeaderActions from '../actions/headerActions';

class Header extends React.Component{

  constructor(props, context) {
    super(props);
    this.state = {title: '', leftButton:'', rightButton:''};
  }

  componentDidMount() {
    // this.listenTo(HeaderActions.setTitle, this.onSetTitle);
    //this.listenTo(HeaderActions.setLeftButton, this.onSetLeftButton);
    //this.listenTo(HeaderActions.setRightButton, this.onSetRightButton);
  }

  onSetTitle(title){
    this.setState({title: title});
  }

  onSetLeftButton(leftButton){
    this.setState({leftButton:leftButton});
  }
  onSetRightButton(rightButton){
    this.setState({rightButton:rightButton});
  }

  render() {
    return (
      <header className="clearfix app__header header">
        <div className="header__button">
          {this.state.leftButton}
        </div>
        <h2 className="header__title">{this.state.title}</h2> 
        <div className="header__button">
          {this.state.rightButton}
        </div> 
      </header>
    );
  }

}


export default Header;