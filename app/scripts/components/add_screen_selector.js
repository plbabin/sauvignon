import React from 'react';

import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux'

import classnames from 'classnames';
import ButtonAddProduct from '../components/buttons/add_product';
import ButtonAddProductType from '../components/buttons/add_product_type';

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
    const { dispatch } = this.props;

    dispatch(pushState(null, '/product/add'));

    this.props.onToggleModal();
  }

  render() {
    return (
      <div>
        <div className={this.getModalClassName()}>
          <div className="modal__content" onClick={this.props.onToggleModal} >
            <ButtonAddProduct onclick={this.props.onToggleModal} isActive={this.props.isActive}>Add</ButtonAddProduct>
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


function mapDispatchToProps(dispatch) {
  return {dispatch}
}

export default connect(
  (state) => ({
    router: state.router
  }),
  mapDispatchToProps
)(AddScreenSelector)