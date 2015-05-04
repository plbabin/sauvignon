import React from 'react';
import classnames from 'classnames';

class ButtonAddProductType extends React.Component{
  constructor(props, context) {
    super(props);
  }

  getClassName(){
    return classnames(
      this.props.className, 
      "btn_add_product_type", 
      "text-hide",
      'icon--centered',
      'btn_add_product_type--'+this.props.icon,
      {"is-active":this.props.isActive}
    )
  }

  getIconClassName(){
    return classnames('icon', 'ico_btn_'+this.props.icon);
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

ButtonAddProductType.propTypes = {
  isActive: React.PropTypes.bool.isRequired
};
ButtonAddProductType.defaultProps = {isActive: false };


export default ButtonAddProductType;