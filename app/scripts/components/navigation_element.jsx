import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

class NavigationElement extends React.Component{
  constructor(props, context) {
    super(props);
  }

  getIconClassName() {
    return classnames('icon', 'ico_nav_'+this.props.icon);
  }

  getAnchorClassName() {
    return classnames(
      'icon--centered',
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