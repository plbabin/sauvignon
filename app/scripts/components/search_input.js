import React from 'react';
import classnames from 'classnames';

class SearchInput extends React.Component{
  constructor(props, context) {
    super(props);
    this.state = {
      searchText: ''
    }
  }

  componentWillUpdate(nextProps, nextState){
    this.props.onSearchTextChange(nextState.searchText);
  }

  getClassName(){
    return classnames({})
  }

  clearSearch(){
    this.setState({'searchText':''});
  }

  render() {
    return (
      <div>
        <span>search icon</span>
        <input type="text" 
               placeholder="Search by name or by code" 
               value={this.state.searchText}
               onChange={(e) => {this.setState({'searchText':e.target.value})} }
               />
        <a href onClick={this.clearSearch.bind(this)}>clear icon</a>
      </div>
    );
  }

}

export default SearchInput;