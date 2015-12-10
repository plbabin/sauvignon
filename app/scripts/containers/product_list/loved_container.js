import React from 'react';
import ListContainer from '../list_container';
import ButtonFilter from '../../components/buttons/filter';

class ProductListLovedContainer extends ListContainer {

  constructor(props, context){
    super(props);
  }

}

ProductListLovedContainer.defaultProps = { type: 'love' };

export default ProductListLovedContainer;