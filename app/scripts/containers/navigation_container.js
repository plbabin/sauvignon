import React from 'react';
import Navigation from '../components/navigation';
import classnames from 'classnames'

class NavigationContainer extends React.Component{

  constructor(props, context) {
    super(props);
  }

  getClassnames(){
    return classnames(
      'page__nav',
      'nav'
    );
  }

  render() {
    const {onClickProductAdd} = this.props;

    return (
      <Navigation onClickProductAdd={onClickProductAdd} 
                  className={this.getClassnames()} />
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {dispatch}
}

export default NavigationContainer