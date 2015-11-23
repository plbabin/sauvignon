import React from 'react';
import HeaderActions from '../actions/headerActions';
import ButtonFilter from '../components/buttons/filter';

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux'

import ProductList from '../components/product_list.js';

class ProductListContainer extends React.Component {

  constructor(props){
    super(props); 
  }

  toggleFilterPanel(e){
    e.preventDefault();
    e.stopPropagation();

    console.log('toggleFilterPanel');
  }



  render() {
    let products = this.props.products;

    return (
      <div>
        <ProductList { ...this.state } products={products} />
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
)(ProductListContainer)