import React from 'react';

class ProductList extends React.Component {

  render() {
    return (
      <div>
        <h1>Product List {this.props.type}</h1>
      </div>
    );
  }

}

export default ProductList;