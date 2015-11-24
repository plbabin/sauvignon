import React from 'react';

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import HeaderSearchContainer from '../containers/header_search_container';
import ProductListContainer from '../containers/product_list_container';

import { searchProduct } from '../actions/product_actions';

class ProductAddContainer extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      isLoading:false
    }
  }

  onSearchTextChange(newSearchText) {
    newSearchText = 'maker';
    console.log('trigger search to API', newSearchText);
    this.props.searchProduct(newSearchText);
  }

  render() {
    const { location, products, isFetching } = this.props

    let isModal = (
      location && 
      location.state &&
      location.state.modal &&
      this.previousChildren
    )

    return (
      <div className="page-container">
        <HeaderSearchContainer onSearchTextChange={this.onSearchTextChange.bind(this)} />
        <ProductListContainer products={products} isFetching={isFetching} ordering={true}  />
      </div>
    );
  }

}

// ProductAddContainer.propTypes = {
//   products: PropTypes.array.isRequired,
//   stargazersPagination: PropTypes.object,
//   loadRepo: PropTypes.func.isRequired,
//   loadStargazers: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
  return {
    dispatch, 
    searchProduct: bindActionCreators(searchProduct, dispatch)
  }
}

function mapStateToProps(state){
  let { search_items_ordered_ids, search_items } = state.products;

  const products = search_items_ordered_ids.map((id) => {
    return search_items.get(id.toString());
  } );

  return {
    products: products,
    isFetching: state.products.isFetching
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(ProductAddContainer)