import React from 'react';
import ProductCell from './cells/product_cell';
import Immutable from 'immutable'

class List extends React.Component {
  
  constructor(props){
    super(props);
  }

  getCellType(){
    switch(this.props.type){
      case 'product':
        return ProductCell
      case 'store':
        return 'Cell'
      default:
        return 'Cell';
    }
  }

  render() {
    let CellComponent = this.getCellType();
    var itemsComponents = this.props.items.map(item => <CellComponent key={item.id} {...item} />);

    return (
      <div>
        { itemsComponents }
      </div>
    );
  }
                                     
}

List.propTypes = {
  items : React.PropTypes.instanceOf(Immutable.List).isRequired,
};

export default List;