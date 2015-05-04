import React from 'react';
import classnames from 'classnames';

class ButtonFilter extends React.Component{
  constructor(props, context) {
    super(props);
  }

  getClassName(){
    return classnames(
      "btn_filter",
      'btn',
      'icon--centered', 
      this.props.className, 
      "text-hide"
    )
  }

  render() {
    return (
      <a href="" className={this.getClassName()} onClick={this.props.onclick}>
        <span className="icon ico_header_filter"></span>
        Filter
      </a>
    );
  }

}

ButtonFilter.propTypes = {};
ButtonFilter.defaultProps = {};


export default ButtonFilter;