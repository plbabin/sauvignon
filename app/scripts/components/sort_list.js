import React from 'react';
import classnames from 'classnames';
import {SORT_ASC} from '../constants/sort'

class SortList extends React.Component{

  constructor(props, context) {
    super(props);
  }

  getItemListClassnames(item){

    return classnames(
      'sort-list__element',
      `sort-list__element-${((this.props.sort_order === SORT_ASC) ? 'down' : 'up')}`,
       {'sort-list__element--current':(item.type === this.props.sort_type)}
    );
  }

  render() {
    let itemsLinks = this.props.items.map((item,index)=>{
      return (
        <div className={this.getItemListClassnames(item)} key={index}>
          <a onClick={this.props.onSortClick} onClick={((e)=>{
            this.props.onSortClick(e, item);
          })}>
            <span>{item.name}</span>
            <span className="sort-list__order-icon icon ico_arrow_sort"></span>
          </a>
        </div>
      );
    }); 
    return (
      <nav className="sort-list">
        {itemsLinks}
      </nav>
    );
  }

}

export default SortList;