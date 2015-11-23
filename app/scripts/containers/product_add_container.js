import React from 'react';

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import HeaderSearchContainer from '../containers/header_search_container';
import ProductListContainer from '../containers/product_list_container';

import { fetchProductSearch } from '../actions/product_search_actions';

class ProductAddContainer extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      isLoading:false
    }
  }

  onSearchTextChange(newSearchText) {
    newSearchText = 'maker';
    console.log('trigger search to API', newSearchText);
    this.props.fetchProductSearch(newSearchText);
  }

  render() {
    const { location, items, isFetching } = this.props

    let isModal = (
      location && 
      location.state &&
      location.state.modal &&
      this.previousChildren
    )

    return (
      <div className="page-container">
        <HeaderSearchContainer onSearchTextChange={this.onSearchTextChange.bind(this)} />
        <ProductListContainer items={items} isFetching={isFetching} ordering={true}  />
      </div>
    );
  }

}

// ProductAddContainer.propTypes = {
//   products: PropTypes.array.isRequired,
//   stargazersPagination: PropTypes.object,
//   loadRepo: PropTypes.func.isRequired,
//   loadStargazers: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
  return {
    dispatch, 
    fetchProductSearch: bindActionCreators(fetchProductSearch, dispatch)
  }
}

function mapStateToProps(){
  const {
    pagination: { stargazersByRepo },
    entities: { users, repos }
  } = state

  const fullName = `${login}/${name}`
  const stargazersPagination = stargazersByRepo[fullName] || { ids: [] }
  const stargazers = stargazersPagination.ids.map(id => users[id])

  return {
    fullName,
    name,
    stargazers,
    stargazersPagination,
    repo: repos[fullName],
    owner: users[login]
  }
}

export default connect(
  (state) => ({
  }), mapDispatchToProps
)(ProductAddContainer)