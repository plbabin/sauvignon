import React from 'react';
import HeaderActions from '../actions/headerActions';
import ButtonFilter from '../components/buttons/filter.jsx';

import ProductList from '../components/product_list.jsx';
import ProductListStore from '../stores/product_list_store';
import ProductListActions from '../actions/product_list_actions';

import ProductStore from '../stores/product_store.js';
import ProductAction from '../actions/product_actions.js';

import _ from 'lodash'

class ProductListContainer extends React.Component {

  constructor(props){
    super(props);
    //HeaderActions.setRightButton(<ButtonFilter onclick={this.toggleFilterPanel.bind(this)}/>)

    //ProductListActions.setType(this.props.type);

    // this.state = _.assign({
    //     loading: false
    //   }, 
    //   ProductListStore.getDefaultData()
    // );
  }

  componentDidMount() {
    //this.unsubscribe = ProductListStore.listen(this.onStatusChange.bind(this));
    //ProductListActions.updateList();

    // ProductListActions.addProduct({"id":12355,"board_id":12401477,"name":"Auchentoshan American Oak Lowland Scotch Single Malt","description":null,"price_in_cents":5350,"on_sale":false,"volume_in_milliliters":750,"alcohol_content":40.0,"upc":"05010496003657","image_url":"http://s7d9.scene7.com/is/image/SAQ/12401477_is","created_at":"2015-01-06T20:40:40.398Z","updated_at":"2015-01-07T03:08:38.793Z","last_updated_time":"2015-01-07T03:08:38.791Z","sku":null,"country":{"id":1,"name":"United Kingdom","created_at":"2014-05-21T20:02:24.439Z","updated_at":"2014-05-21T20:02:24.439Z"},"subtype":{"id":1,"name":"Scotch whisky","type_id":null,"created_at":"2014-05-21T20:06:35.641Z","updated_at":"2014-05-21T20:06:35.641Z"},"region":{"id":1,"name":"Scotland","country_id":1,"created_at":"2014-05-21T20:02:24.462Z","updated_at":"2014-05-21T20:02:24.493Z"},"type":null,"varietals":[]})
    // ProductListActions.addProduct(12355);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStatusChange(state) {
    console.log('status change', state);
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

export default ProductListContainer;