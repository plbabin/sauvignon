import React from 'react';

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux'

import HeaderSearchContainer from '../containers/header_search_container';
import ProductListContainer from '../containers/product_list_container';

class ProductAddContainer extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      isLoading:false
    }
  }

  onSearchTextChange(newSearchText) {
    console.log('trigger search to API', newSearchText);
  }

  render() {
    let { location } = this.props

    let isModal = (
      location && 
      location.state &&
      location.state.modal &&
      this.previousChildren
    )

    return (
      <div className="page-container">
        <HeaderSearchContainer onSearchTextChange={this.onSearchTextChange.bind(this)} />
        <ProductListContainer {...this.state} ordering={true}  />
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