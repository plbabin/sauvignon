import React from 'react';
import ProductCell from './cells/product_cell';
import classnames from 'classnames'
class ProductList extends React.Component {
  
  constructor(props){
    super(props);
  }

  getClassName(){
    return classnames(this.props.className, 'product__list');
  }

  render() {
    console.log('Products', this.props.products);
    var productsComponent = this.props.products.map(product => <ProductCell key={product.id} {...product} />);;

    return (
      <ul className={this.getClassName()}>
        { productsComponent }
      </ul>
    );
  }
                                     
}

// ProductList.propTypes = {
//   products : React.PropTypes.array.isRequired
// };

export default ProductList;