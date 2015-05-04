import React from 'react';
import { Link } from 'react-router';
import classnames from '../../bower_components/classnames/index.js';
import ButtonAddProduct from '../components/button_add_product.jsx';
import ButtonAddProductType from '../components/button_add_product_type.jsx';

class AddScreenSelector extends React.Component{
  constructor(props, context) {
    super(props);
  }

  stopPropagation(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  getModalClassName(){
    return classnames('add-screen-selector','modal', {'modal--show':this.props.isActive});
  }

  openSearchByCamera(e){
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
  }
  openSearchByText(e){
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
  }

  render() {
    return (
      <div>
        <div className={this.getModalClassName()}>
          <div className="modal__content" onClick={this.props.toggleModal} >
            <ButtonAddProduct onclick={this.props.toggleModal} isActive={this.props.isActive}>Add</ButtonAddProduct>
            <ButtonAddProductType onclick={this.openSearchByCamera.bind(this)} icon="camera" isActive={this.props.isActive}>Camera</ButtonAddProductType>
            <ButtonAddProductType onclick={this.openSearchByText.bind(this)} icon="search" isActive={this.props.isActive}>Search</ButtonAddProductType>
          </div>
        </div>
        <div className="modal__overlay" />
      </div>
    );
  }

}

AddScreenSelector.propTypes = {};
AddScreenSelector.defaultProps = {};


export default AddScreenSelector;