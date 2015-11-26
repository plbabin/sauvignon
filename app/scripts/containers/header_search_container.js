import React from 'react';

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux'

import SearchInput from '../components/search_input';

class HeaderSearchContainer extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="page__container__header header header--search">
        <SearchInput onSearchTextChange={this.props.onSearchTextChange} />
        <div className="header--search__close">
          <a onClick={this.props.onClose}>close</a>
        </div>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {dispatch}
}

export default connect(
  (state) => ({
  }),
  mapDispatchToProps
)(HeaderSearchContainer)