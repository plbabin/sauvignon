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

  shouldComponentUpdate(nextProps, nextState){
    return nextState.searchText !== this.state.searchText;
  }

  clearSearch(e){
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({'searchText':''});

  }

  getClassName(){
    console.log(this.state.searchText, (this.state.searchText.length===0));
    return classnames(
      'search_input',
      {'search_input--is-empty':(this.state.searchText.length===0)}
    )
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <div className="search_input__icon">
          <span className="icon ico_search_header">search icon</span>
        </div>
        <input type="text" 
               placeholder="Search by name or by code" 
               value={this.state.searchText}
               onChange={(e) => {this.setState({'searchText':e.target.value})} }
               />
        <div className="search_input__icon search_input__clear">
          <a href onClick={this.clearSearch.bind(this)} className="icon ico_clear_fieldtext_white">
            <span className="icon ico_clear_fieldtext_white">clear icon</span>
          </a>
        </div>
      </div>
    );
  }

}

export default SearchInput;