import React from 'react';

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux'

class HeaderSearchContainer extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="header">
        header
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {dispatch}
}

export default connect(
  (state) => ({
  }),
  mapDispatchToProps
)(HeaderSearchContainer)