import React from 'react';

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux'

class ProductAddContainer extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {
    let { location } = this.props

    let isModal = (
      location && 
      location.state &&
      location.state.modal &&
      this.previousChildren
    )

    //var name = this.context.router.getCurrentPath();
    return (
      <div>
        content
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
)(ProductAddContainer)