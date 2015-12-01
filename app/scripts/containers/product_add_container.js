import React from 'react';

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import HeaderSearchContainer from '../containers/header_search_container';
import ListContainer from '../containers/list_container';
import {isGrouped} from '../lib/helpers/sorted_group'

import { searchProduct, clearSearch } from '../actions/product_actions';

class ProductAddContainer extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      isLoading:false
    }

    this.cancelOldRequest();
  }

  componentWillMount(){
    this.props.clearSearch(); //clear search when opening container
  }

  onSearchTextChange(newSearchText) {
    if(newSearchText===''){
      return this.props.clearSearch();
    }

    this.cancelOldRequest();

    const triggerSearch = ()=>{
      this.props.searchProduct(newSearchText);
    };

    if(!this.props.isFetching){
      this.timeout = setTimeout(triggerSearch,300);
    }else{
      this.queueRequest = triggerSearch;
    }
  }

  componentDidUpdate(newProps,){
    this.triggerQueuedRequest();
  }

  componentWillUnmount(){
    this.cancelOldRequest();
  }

  cancelOldRequest(){
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null;
    }
    this.queueRequest = null;
  }

  triggerQueuedRequest(){
    if(this.queueRequest && !this.props.isFetching){
      console.log('TRIGGER QUEUED REQUEST');
      this.queueRequest();
      this.queueRequest = null;
    }
  } 

  render() {
    const { location, products, isFetching } = this.props

    let isModal = (
      location && 
      location.state &&
      location.state.modal &&
      this.previousChildren
    ) 

    return (
      <div className="page__container">
        <HeaderSearchContainer onSearchTextChange={this.onSearchTextChange.bind(this)} onClose={this.props.onHide} />
        <ListContainer className="page__container__content" items={products} type="product" isFetching={isFetching} ordering={true} isGrouped={this.props.isGrouped}  />
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
    searchProduct: bindActionCreators(searchProduct, dispatch),
    clearSearch: bindActionCreators(clearSearch, dispatch)
  }
}

function mapStateToProps(state){
  const { isFetching, search_items_ordered, sort_type } = state.products;

  return {
    products: search_items_ordered,
    isFetching,
    isGrouped: isGrouped(sort_type)
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(ProductAddContainer)