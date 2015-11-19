import React from 'react';
import ProductListContainer from '../product_list_container';
import HeaderActions from '../../actions/headerActions';
import ButtonFilter from '../../components/buttons/filter';

class ProductListTotryContainer extends ProductListContainer {

  constructor(props, context){
    super(props);
    HeaderActions.setTitle('To-Try Products');
  }

}

ProductListTotryContainer.defaultProps = { type: 'totry' };

export default ProductListTotryContainer;