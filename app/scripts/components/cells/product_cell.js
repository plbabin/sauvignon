import React from 'react';

class ProductCell extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {
    return (
      <li>{this.props.name}</li>
    );
  }
                                     
}

ProductCell.propTypes = {
  
};

export default ProductCell;