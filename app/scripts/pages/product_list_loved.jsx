import ProductList from './product_list.jsx';
import React from 'react';
import HeaderActions from '../actions/headerActions';
import ButtonFilter from '../components/buttons/filter.jsx';

class ProductListLoved extends ProductList {

  constructor(props, context){
    super(props);
    HeaderActions.setTitle('Loved Products');
  }

}

ProductListLoved.defaultProps = { type: 'love' };

export default ProductListLoved;