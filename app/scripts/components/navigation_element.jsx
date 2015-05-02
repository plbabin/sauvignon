import React from 'react';
import { Link } from 'react-router';
import classnames from '../../bower_components/classnames/index.js';

class NavigationElement extends React.Component{
  constructor(props, context) {
    super(props);
  }

  getIconClassName() {
    return classnames('icons', 'ico_nav_'+this.props.icon);
  }

  getAnchorClassName() {
    return classnames(
      "text-hide"
    );
  }

  render() {
    return (
      <Link to={this.props.route} className={this.getAnchorClassName()} activeClassName="selected">
        <span className={this.getIconClassName()}></span>
        {this.props.children}
      </Link>
    );
  }

}

NavigationElement.propTypes = { 
  children: React.PropTypes.string.isRequired, 
  icon: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool.isRequired
};
NavigationElement.defaultProps = { icon: 'love', isActive: false };


export default NavigationElement;