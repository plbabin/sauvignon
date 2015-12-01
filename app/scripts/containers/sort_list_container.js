import React from 'react';

import SortList from '../components/sort_list';
import { connect }            from 'react-redux';
import Immutable from 'immutable'

import { SORT_TYPE_CATEGORY, SORT_TYPE_PRICE, SORT_TYPE_NAME,SORT_ASC,SORT_DESC } from '../constants/sort'
import { setSort } from '../actions/product_actions'

class SortListContainer extends React.Component {

  getSortItemsList(){
    if(this.props.type == 'product'){
      return [{
        type:SORT_TYPE_CATEGORY,
        name: 'Type'
      },{
        type:SORT_TYPE_PRICE,
        name: 'Price',
      },{
          type:SORT_TYPE_NAME,
          name: 'Name'
      }];
    }else{
      return [{
        type:SORT_TYPE_CATEGORY,
        name: 'Type',
      },{
          type:SORT_TYPE_NAME,
          name: 'Name'
      }];
    }
  }

  onSortClick(e, item){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    let order, type;
    if(item.type === this.props.sort_type){
      // flip the current order
      order = (this.props.sort_order === SORT_ASC)? SORT_DESC : SORT_ASC;
    }else{
      order = SORT_ASC;
      type = item.type;
    }

    this.props.dispatch( setSort(type, order) );
  }

  render() {
    return (
      <SortList onSortClick={this.onSortClick.bind(this)} 
                items={this.getSortItemsList()}
                sort_type={this.props.sort_type}
                sort_order={this.props.sort_order}
                />
    );
  }

}

SortListContainer.propTypes = {
  type: React.PropTypes.oneOf(['product', 'store']).isRequired
};

function mapDispatchToProps(dispatch) {
  return {dispatch}
}

export default connect(
  (state) => ({
    sort_order: state.products.sort_order,
    sort_type: state.products.sort_type,
  }),
  mapDispatchToProps
)(SortListContainer)