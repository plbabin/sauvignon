import React from 'react';
import HeaderActions from '../actions/headerActions';
import ButtonFilter from '../components/buttons/filter.jsx';

import ProductList from '../components/product_list.jsx';
import ProductStore from '../stores/product_store';
import ProductActions from '../actions/product_actions';

class ProductListPage extends React.Component {

  constructor(props){
    super(props);
    HeaderActions.setRightButton(<ButtonFilter onclick={this.toggleFilterPanel.bind(this)}/>)

    this.state = {
      products : [],
      loading: false
    };
  }

  componentDidMount() {
    this.unsubscribe = ProductStore.listen(this.onStatusChange.bind(this));
    ProductActions.loadProducts();
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
        <h1>Product List {this.props.type}</h1>
        <ProductList { ...this.state } />
      </div>
    );
  }

}

export default ProductListPage;