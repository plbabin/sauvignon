import React from 'react';
import ProductCell from './cells/product_cell';

class ProductList extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {
    let tableData = this.props.tableData || [];
    var products = tableData.map(product => <ProductCell key={product.id} {...product} />),
      loading = this.props.loading ? <div className="loading-label">Loading...</div> : '';

    return (
      <div>
        { loading }
        <ul>
          { products }
        </ul>
      </div>
    );
  }
                                     
}

ProductList.propTypes = {
  loading : React.PropTypes.bool,
  tableData : React.PropTypes.array
};

export default ProductList;