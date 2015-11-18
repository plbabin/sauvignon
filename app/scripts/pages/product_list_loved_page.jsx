import React from 'react';
import ProductListPage from './product_list_page.jsx';
import * as HeaderActions from '../actions/headerActions';
import ButtonFilter from '../components/buttons/filter.jsx';

class ProductListLovedPage extends ProductListPage {

  constructor(props, context){
    super(props);
    HeaderActions.setHeaderTitle('Loved Products');
  }

}

ProductListLovedPage.defaultProps = { type: 'love' };

export default ProductListLovedPage;