import ProductList from './product_list.jsx';
import React from 'react';

class ProductListLoved extends ProductList {

  constructor(props, context){
    super(props);
  }

}

ProductListLoved.defaultProps = { type: 'love' };

export default ProductListLoved;