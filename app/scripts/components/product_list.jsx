import React from 'react';

class ProductList extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {
    var products = this.props.products.map(product => <li key={ product }>{ product }</li>),
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
  products : React.PropTypes.array
};

export default ProductList;