import React from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import connectHistory from '../lib/connect_history'

import {fetchProduct} from '../actions/product_actions'

class ProductContainer extends React.Component {

  componentWillMount(){
    if(this.props.needFetch){
      this.props.fetchProduct(this.props.params.itemId);
    }
  }

  componentWillUpdate(nextProps){
    console.log('componentWillUpdate', this.props);
  }


  render() {
    return (
      <div>
        <h1>Product</h1>
      </div>
    );
  }

}

function getProductFromCache(state){
  const product_id = parseInt(state.router.params.itemId,10);
  const { search_items, items } = state.products;

  let product = search_items.filter(p => p.id === product_id);
  if(product.size > 0){
    return product.first();
  }

  product = items.filter(p => p.id === product_id);
  if(product.size > 0){
    return product.first();
  }
  
  return null;
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch, 
    fetchProduct: bindActionCreators(fetchProduct, dispatch),
  }
}

function mapStateToProps(state){
  const { last_product_fetched } = state.products;
  let needFetch = true;
  let product;

  if(last_product_fetched && last_product_fetched.id === state.router.params.itemId){
    product = last_product_fetched;
    needFetch = false;
  }else{
    product = getProductFromCache(state);
  }
  
  return {
    product,
    needFetch
  }
}

export default connectHistory(connect(
  mapStateToProps, mapDispatchToProps
)(ProductContainer))