import React from 'react';
import ListContainer from '../list_container';
import ButtonFilter from '../../components/buttons/filter';

class ProductListTotryContainer extends ListContainer {

  constructor(props, context){
    super(props);
  }

}

ProductListTotryContainer.defaultProps = { type: 'totry' };

export default ProductListTotryContainer;