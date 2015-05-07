import React from 'react';
import HeaderActions from '../actions/headerActions';
import ButtonFilter from '../components/buttons/filter.jsx';

import ProductList from '../components/product_list.jsx';
import ProductListStore from '../stores/product_list_store';
import ProductListActions from '../actions/product_list_actions';


import _ from 'lodash'

class ProductListPage extends React.Component {

  constructor(props){
    super(props);
    HeaderActions.setRightButton(<ButtonFilter onclick={this.toggleFilterPanel.bind(this)}/>)

    ProductListActions.setType(this.props.type);

    this.state = _.assign({
        loading: false
      }, 
      ProductListStore.getDefaultData()
    );
  }

  componentDidMount() {
    this.unsubscribe = ProductListStore.listen(this.onStatusChange.bind(this));
    ProductListActions.getProducts();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStatusChange(state) {
    this.setState(state);
  }

  toggleFilterPanel(e){
    e.preventDefault();
    e.stopPropagation();

    console.log('toggleFilterPanel');
  }



  render() {
    return (
      <div>
        <ProductList { ...this.state } />
      </div>
    );
  }

}

export default ProductListPage;