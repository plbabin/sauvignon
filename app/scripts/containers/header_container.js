import React from 'react';
import HeaderActions from '../actions/headerActions';
import Header from '../components/header.jsx';

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

class HeaderContainer extends React.Component{

  constructor(props, context) {
    super(props);
  }

  render() {
    let props = this.props.header.toJS();
    
    return(
      <Header {...props} />
    );
  }

}

export default connect(
  state => ({
    header: state.header
  })
)(HeaderContainer)