import React from 'react';

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux'

import SearchInput from '../components/search_input';

class HeaderSearchContainer extends React.Component {
  
  constructor(props){
    super(props);
  }

  close(){

  }

  render() {

    return (
      <div className="header">
        <SearchInput onSearchTextChange={this.props.onSearchTextChange} />
        <a href onClick={this.close.bind(this)}>close</a>
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