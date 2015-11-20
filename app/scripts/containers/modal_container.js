import React from 'react';

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import classnames from 'classnames';

class ModalContainer extends React.Component{

  constructor(props, context) {
    super(props);
  }

  getModalClassName(){
    return classnames(
      'modal', 
      'modal--show',
      'modal--slide-effect',
      {'modal--fullscreen':this.props.isFullscreen}
    );
  }

  hide(){
    
  }

  render() {
    return(
      <div>
        <div className={this.getModalClassName()}>
          <div className="modal__content" onClick={this.hide.bind(this)} >
            {this.props.children}
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