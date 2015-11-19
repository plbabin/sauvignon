import React from 'react';
import ProductListContainer from '../product_list_container';
import * as HeaderActions from '../../actions/headerActions';
import ButtonFilter from '../../components/buttons/filter';

class ProductListLovedContainer extends ProductListContainer {

  constructor(props, context){
    super(props);
    HeaderActions.setHeaderTitle('Loved Products');
  }

}

ProductListLovedContainer.defaultProps = { type: 'love' };

export default ProductListLovedContainer;