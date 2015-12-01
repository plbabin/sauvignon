import React from 'react';
import classnames  from 'classnames';

class ProductPrice extends React.Component {
  
  constructor(props){
    super(props);
  }

  getClassnames(){
    return classnames(
      'product__price',
      {'product__price__on-sale': this.props.on_sale},
    );
  }

  getProductPrice() {
    let price = this.props.price_in_cents / 100;
    if(this.props.on_sale){
      price = this.props.sale_price_in_cents / 100;
    }
    return price.toFixed(2).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
  }

  render() {
   return (
      <span className={this.getClassnames()}>
        <span className="product__price__value">${this.getProductPrice()}</span>
      </span>
    );
  }
                                     
}

// ProductPrice.propTypes = {
//   product : React.PropTypes.instanceOf(Immutable.List).isRequired,
// };

export default ProductPrice;