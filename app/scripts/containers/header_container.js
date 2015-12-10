import React from 'react';
import HeaderActions from '../actions/headerActions';
import Header from '../components/header';

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

class HeaderContainer extends React.Component{

  constructor(props, context) {
    super(props);
  }

  render() {
    return(
      <Header {...this.props} />
    );
  }

}

export default HeaderContainer