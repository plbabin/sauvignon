import React from 'react';
import Immutable from 'immutable';
import classnames from 'classnames'

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux'

import List from '../components/list.js';
import CellHeader from '../components/cell_header.js';

import SortListContainer from '../containers/sort_list_container';

class ListContainer extends React.Component {

  constructor(props){
    super(props); 
  }

  getClassName(){
    return classnames(
      this.props.className, 
      'product__list',
      {'product__list--with-sort': this.props.ordering}
      );
  }

  render() {
    let listComponents;
    console.log(this.props);
    if( !this.props.isGrouped ) {
      listComponents = <List {...this.props} />;
    }else{
      listComponents = this.props.items.map((items, title)=>{
        return (
          <div key={title}>
            <CellHeader title={title} />
            <List items={items} type={this.props.type} />
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

export default connect(
  (state) => ({

  }),
  mapDispatchToProps
)(ListContainer)