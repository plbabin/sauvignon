import React from 'react';

class ProductCell extends React.Component {
  
  constructor(props){
    super(props);
  }

  getSubtitle(){
    return [
      this.getPropsSubObjectName(this.props.subtype), 
      this.props.volume_in_milliliters, 
      this.props.board_id
    ].filter((value)=>{
      return (value !== '' && value !== undefined && value !== null)
    }).join(',');
  }

  getRegionLine(){
    return [
      this.getPropsSubObjectName(this.props.region), 
      this.getPropsSubObjectName(this.props.country)
    ].filter((value)=>{
      return (value !== '' && value !== undefined && value !== null)
    }).join(',');
  }

  getCellStyles(){
    return {
      backgroundImage:'url('+this.props.image_url+')'
    }
  }

  getPropsSubObjectName(props){
    if(props && props.name){
      return props.name;
    }
    return null;
  }

  render() {
    return (
      <div className="table_cell product__cell">
        <div className="table_cell__imageColumn product__cell__imageColumn">
          <span className="table_cell__image" style={this.getCellStyles()}></span>
          <div className="table_cell__image-info">
            <span className="product__price">{this.props.price_in_cents}</span>
          </div>
        </div>
        <div className="table_cell__contentColumn product__cell__contentColumn">
          <h2 className="table_cell__title">{this.props.name}</h2>

          <div className="table_cell__swipeContainer table_cell__swipeContainer--is-close">
            <div className="table_cell__swipeCell">  
              <h3 className="table_cell__subtitle">{this.getSubtitle()}</h3>
              <p className="table_cell__subtitle">{this.getRegionLine()}</p>
            </div>
            <div className="table_cell__swipeCell">
              <ul className="table_cell__action-list">
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
        </div>
      </div>
    );
  }
                                     
}

ProductCell.propTypes = {
  
};

export default ProductCell;