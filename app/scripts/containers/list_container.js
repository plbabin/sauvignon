import React from 'react';
import Immutable from 'immutable';
import classnames from 'classnames'

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux'

import List from '../components/list.js';
import CellHeader from '../components/cell_header.js';
import {isGrouped} from '../lib/helpers/sorted_group'

class ListContainer extends React.Component {

  constructor(props){
    super(props); 
  }

  getClassName(){
    return classnames(this.props.className, 'product__list');
  }

  render() {
    let listComponents;
    if( !isGrouped(this.props.sort_type)) {
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

    return (
      <div className={this.getClassName()}>
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