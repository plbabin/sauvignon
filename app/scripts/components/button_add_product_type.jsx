import React from 'react';
import classnames from '../../bower_components/classnames/index.js';

class ButtonAddProduct extends React.Component{
  constructor(props, context) {
    super(props);
  }

  getClassName(){
    return classnames(
      this.props.className, 
      "btn_add_product_type", 
      "text-hide",
      'btn_add_product_type--'+this.props.icon,
      {"is-active":this.props.isActive}
    )
  }

  getIconClassName(){
    return classnames('icons', 'ico_btn_'+this.props.icon);
  }

  render() {
    return (
      <a href="" className={this.getClassName()} onClick={this.props.onclick}>
        <span className={this.getIconClassName()}></span>
        {this.props.children}
      </a>
    );
  }

}

ButtonAddProduct.propTypes = {
  isActive: React.PropTypes.bool.isRequired
};
ButtonAddProduct.defaultProps = {isActive: false };


export default ButtonAddProduct;