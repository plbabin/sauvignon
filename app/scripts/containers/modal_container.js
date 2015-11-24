import React from 'react';

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import classnames from 'classnames';

class ModalContainer extends React.Component{

  constructor(props, context) {
    super(props);
    
    // inject all modal parent props to a new children
    const {children, ...other} = this.props;
    this.newChildren = React.cloneElement(this.props.children, Object.assign({}, this.props.children.props, other));
  }

  getModalClassName(){
    return classnames(
      'modal', 
      'modal--show',
      'modal--slide-effect',
      {'modal--fullscreen':this.props.isFullscreen}
    );
  }

  render() {
    return(
      <div>
        <div className={this.getModalClassName()}>
          <div className="modal__content" onClick={this.onHide} >
            {this.newChildren}
          </div>
        </div>
      </div>
    );
  }

}

ModalContainer.propTypes = {
  isFullscreen: React.PropTypes.bool
};
ModalContainer.defaultProps = {
  isFullscreen: false
};

export default connect(
  state => ({
  })
)(ModalContainer)