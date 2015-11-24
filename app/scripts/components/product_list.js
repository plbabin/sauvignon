import React from 'react';
import ProductCell from './cells/product_cell';

class ProductList extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {
    console.log('Products', this.props.products);
    var productsComponent = this.props.products.map(product => <ProductCell key={product.id} {...product} />);;

    return (
      <div className="product-list">
        <ul>
          { productsComponent }
        </ul>
      </div>
    );
  }
                                     
}

// ProductList.propTypes = {
//   products : React.PropTypes.array.isRequired
// };

export default ProductList;