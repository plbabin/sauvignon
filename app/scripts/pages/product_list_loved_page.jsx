import ProductListPage from './product_list_page.jsx';
import React from 'react';
import HeaderActions from '../actions/headerActions';
import ButtonFilter from '../components/buttons/filter.jsx';

class ProductListLovedPage extends ProductListPage {

  constructor(props, context){
    super(props);
    HeaderActions.setTitle('Loved Products');
  }

}

ProductListLovedPage.defaultProps = { type: 'love' };

export default ProductListLovedPage;