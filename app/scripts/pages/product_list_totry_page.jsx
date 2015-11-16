import ProductListPage from './product_list_page.jsx';
import React from 'react';
import HeaderActions from '../actions/headerActions';
import ButtonFilter from '../components/buttons/filter.jsx';

class ProductListTotryPage extends ProductListPage {

  constructor(props, context){
    super(props);
    HeaderActions.setTitle('To-Try Products');
  }

}

ProductListTotryPage.defaultProps = { type: 'totry' };

export default ProductListTotryPage;