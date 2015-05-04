import ProductList from './product_list.jsx';
import React from 'react';

class ProductListTotry extends ProductList {

  constructor(props, context){
    super(props);
  }

}

ProductListTotry.defaultProps = { type: 'totry' };

export default ProductListTotry;