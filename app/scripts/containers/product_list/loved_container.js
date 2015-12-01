import React from 'react';
import ListContainer from '../list_container';
import * as HeaderActions from '../../actions/headerActions';
import ButtonFilter from '../../components/buttons/filter';

class ProductListLovedContainer extends ListContainer {

  constructor(props, context){
    super(props);
    HeaderActions.setHeaderTitle('Loved Products');
  }

}

ProductListLovedContainer.defaultProps = { type: 'love' };

export default ProductListLovedContainer;