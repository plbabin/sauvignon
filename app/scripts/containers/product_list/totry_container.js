import React from 'react';
import ListContainer from '../list_container';
import HeaderActions from '../../actions/headerActions';
import ButtonFilter from '../../components/buttons/filter';

class ProductListTotryContainer extends ListContainer {

  constructor(props, context){
    super(props);
    HeaderActions.setTitle('To-Try Products');
  }

}

ProductListTotryContainer.defaultProps = { type: 'totry' };

export default ProductListTotryContainer;