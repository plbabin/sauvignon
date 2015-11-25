import React from 'react';

class ProductCell extends React.Component {
  
  constructor(props){
    super(props);
  }

  getSubtitle(){
    return [
      this.props.subtype.name, 
      this.props.volume_in_milliliters, 
      this.props.board_id
    ].filter((value)=>{
      return (value !== '' && value !== undefined && value !== null)
    }).join(',');
  }

  getRegionLine(){
    return [
      this.props.region.name, 
      this.props.country.name
    ].filter((value)=>{
      return (value !== '' && value !== undefined && value !== null)
    }).join(',');
  }

  render() {
    return (
      <li className="productCell">
        <div className="productCell__imageColumn">
          <img src={this.props.image_url} className="product__image" />
          <div className="product__price">
            {this.props.price_in_cents}
          </div>
        </div>
        <div className="productCell__contentColumn">
          <div className="productCell__content productCell__swipeContent--is-visible">
            <h2 className="product__name">{this.props.name}</h2>
            <h3>{this.getSubtitle()}</h3>
            <p>{this.getRegionLine()}</p>
          </div>
          <div className="productCell__swipeContent productCell__swipeContent--is-hidden">
            <ul>
              <li>
                <a>Loved</a>
              </li>
              <li>
                <a>To-try</a>
              </li>
              <li>
                <a>Remove</a>
              </li>
            </ul>
          </div>
        </div>
      </li>
    );
  }
                                     
}

ProductCell.propTypes = {
  
};

export default ProductCell;