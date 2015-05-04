import React from 'react';
import HeaderActions from '../actions/headerActions';
import ButtonFilter from '../components/buttons/filter.jsx';

class ProductList extends React.Component {

  constructor(props){
    super(props);
    HeaderActions.setRightButton(<ButtonFilter onclick={this.toggleFilterPanel.bind(this)}/>)
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
      </div>
    );
  }

}

export default ProductList;