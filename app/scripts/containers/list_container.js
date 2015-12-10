import React from 'react';
import Immutable from 'immutable';
import classnames from 'classnames'

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux'

import List from '../components/list.js';
import CellHeader from '../components/cell_header.js';

import SortListContainer from '../containers/sort_list_container';

import connectHistory from '../lib/connect_history'
import {NAV_ANIMATION_SLIDE, NAV_PUSH} from '../constants/NavTypes'

class ListContainer extends React.Component {

  constructor(props){
    super(props); 
  }

  getClassName(){
    return classnames(
      this.props.className, 
      'list',
      'product__list',
      {'product__list--with-sort': this.props.ordering}
      );
  }

  onCellClick(e, item_id){
    const {history,location} = this.props;
    let fullscreen = false;

    if(history.isActive('/product/add')){
      fullscreen = true;
    }

    const state = {
      animation:NAV_ANIMATION_SLIDE, 
      fullscreen:fullscreen,
      direction:NAV_PUSH
    }
    history.pushState(state, '/product/'+item_id);
  }

  render() {
    let listComponents;

    if( !this.props.isGrouped ) {
      listComponents = <List {...this.props} onclick={this.onCellClick.bind(this)} />;
    }else{
      listComponents = this.props.items.map((items, title)=>{
        return (
          <div key={title}>
            <CellHeader title={title} />
            <List items={items} type={this.props.type} onclick={this.onCellClick.bind(this)} />
          </div>
        );
      }).toArray();
    }
    
    let sortListComponent = '';
    if(this.props.ordering && this.props.items.size > 0){
      sortListComponent = <SortListContainer type={this.props.type} />;
    }

    return (
      <div className={this.getClassName()}>
        {sortListComponent}
        {listComponents}
      </div>
    );
  }

}

ListContainer.propTypes = {
  items : React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(Immutable.List),
    React.PropTypes.instanceOf(Immutable.OrderedMap)
  ]).isRequired,
  type: React.PropTypes.oneOf(['product', 'store']).isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  ordering: React.PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch) {
  return {dispatch}
}

export default connectHistory(connect(
  (state) => ({
    location: state.router.location
  }),
  mapDispatchToProps
)(ListContainer))