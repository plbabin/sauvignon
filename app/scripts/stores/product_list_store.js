import Reflux from 'reflux';
import ProductListActions from '../actions/product_list_actions';
import Persistence from '../core/persistence.js';
import _ from 'lodash'; 
import ProductModel from '../models/product_model.js';
import SortMixin from '../mixins/sort_mixin.js';

// some variables and helpers for our fake database stuff
var productCounter = 0,
    localStorageKey = 'products_lists';

var ProductListStore = Reflux.createStore({
  listenables: [ProductListActions],
  sortType:['type', 'price', 'name'],
  mixins:[SortMixin],
  init: function() {
    // var r = new ProductInfo({id:1, desc:'test', rating: 4});
    this.type = null;

    var element_obj = {
      product_id:1287464,
      rating:4,
      note:'dsfkhjgdfjhgf'
    };

    this._filtered_products = [];
    this._filtered_groups   = [];
  },

  initFromStorage: function(){
    // load lists from storage
    this._lists = Persistence.read(localStorageKey);
    if (!this._lists) {
        // If no list is in localstorage, start out with a default one
        this._lists = {
          'love':[],
          'totry':[]
        };
    }

    // @todo: load sort order from storage
  },

  addProduct: function(product, rating = null, note = null){
    if ( _.isNumber(product) ){
      product = new ProductModel(product);
    }

    if (product.loaded()){
      var in_other_list   = _.find(this._lists[this._getOtherListType()], {product_id:product.id});
      if (in_other_list){
        ProductListActions.moveProduct(product, this.type, this._getOtherListType());
      } else {
        var in_current_list = _.find(this._lists[this.type], {product_id:product.id});
        if (!in_current_list){
          this._lists[this.type].push({product_id: product.id, rating:rating, note: note});
        }
      }
    }
    this._save();
  },

  moveProduct: function(product, from_list, to_list){
    console.log('move');
  },

  setType: function(type){
    this.type = type;
  },

  // if list is pass as params, it mean we want to display a list that is not from LocalStorage
  updateList: function(products = null){
    this.setDataList(products || this._extractProductsFromList());

    this.sortList();

    this._trigger();
  },

  setFilterBy: function(){
    // this._data_list = this._extractProductsFromList();
  },

  _save: function(){
    Persistence.write(localStorageKey, this._lists);
  },
  
  _doFiltering: function(p){
    return p;
  },

  _extractProductsFromList:function(){
    var list = _.map(this._lists[this.type], (o)=>{
      let p = new ProductModel(o.id);

      // we shoud do filtering here, base on filter criteria
      return this._doFiltering(p);
    });
    
    return _.filter(list, (o)=> o !== false);
  },

  _getOtherListType: function(){
    if(this.type === 'love'){
      return 'totry';
    }else{
      return 'love';
    }
  },

  _trigger: function(){
    this.trigger({
        tableData: this._getFilteredAndSortedProductsList(),
        sortOptions: this.getSortOptions(),
        type: this.type
    })
  },

  _getFilteredAndSortedProductsList: function(){
    if(!_.isEmpty(this._filtered_groups)){
      return this._filtered_groups;
    }
    return this._filtered_products;
  },

  // this will be called by all listening components as they register their listeners
  getDefaultData: function() {
    this.initFromStorage();

    return {
      tableData: this._getFilteredAndSortedProductsList(),
      sortOptions: this.getSortOptions(),
      type: this.type
    }
  }
});

export default ProductListStore;