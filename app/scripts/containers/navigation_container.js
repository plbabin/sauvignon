import React from 'react';
import Navigation from '../components/navigation';
import classnames from 'classnames'
import { connect }            from 'react-redux';

class NavigationContainer extends React.Component{

  constructor(props, context) {
    super(props);
  }

  getClassnames(){
    return classnames(
      'nav',
      {'nav--is-hidden':!this.props.isVisible},
      'page__container__nav',
    );
  }

  render() {
    const {onClickProductAdd, isVisible} = this.props;

    return (
      <Navigation onClickProductAdd={onClickProductAdd} 
                  isVisible={isVisible} 
                  className={this.getClassnames()} />
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {dispatch}
}

export default connect(
  (state) => ({
    isVisible:(state.nav.get('visible')===true)
  }),
  mapDispatchToProps
)(NavigationContainer)