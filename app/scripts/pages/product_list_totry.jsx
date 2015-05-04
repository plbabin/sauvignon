import ProductList from './product_list.jsx';
import React from 'react';
import HeaderActions from '../actions/headerActions';
import ButtonFilter from '../components/buttons/filter.jsx';

class ProductListTotry extends ProductList {

  constructor(props, context){
    super(props);
    HeaderActions.setTitle('To-Try Products');
  }

}

ProductListTotry.defaultProps = { type: 'totry' };

export default ProductListTotry;