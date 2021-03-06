import React from 'react';
import classnames from 'classnames';

class ButtonAddProduct extends React.Component{
  constructor(props, context) {
    super(props);
  }

  getClassName(){
    return classnames(
      this.props.className, 
      'btn_add_product',
      'icon--centered', 
      'text-hide',
      {'is-active':this.props.isActive}
    )
  }

  render() {
    return (
      <a href="" className={this.getClassName()} onClick={this.props.onclick}>
        <span className="icon ico_nav_add"></span>
        {this.props.children}
      </a>
    );
  }

}

// ButtonAddProduct.propTypes = {
//   isActive: React.PropTypes.bool.isRequired
// };
ButtonAddProduct.defaultProps = {isActive: false };


export default ButtonAddProduct;