import Reflux from 'reflux';
import ProductListActions from '../actions/product_list_actions';
import Persistence from '../core/persistence.js';
import _ from 'lodash'; 
import Immutable from 'immutable';

// some variables and helpers for our fake database stuff
var productCounter = 0,
    localStorageKey = "products";

var ProductListStore = Reflux.createStore({
  listenables: [ProductListActions],
  init: function() {
    
    // go load data in localStorage
    var Product = Immutable.Record({
      id:null,
      desc:null,
      rating:null,
      type:null,
      data:{}
    });

    // var r = new ProductInfo({id:1, desc:'test', rating: 4});
    this.type = null;
  },

  initFromStorage: function(){
    var loadedList = Persistence.read(localStorageKey);
    if (!loadedList) {
        // If no list is in localstorage, start out with a default one
        this.products = Immutable.List();
    } else {
      var products = JSON.parse(loadedList);
      this.products = Immutable.fromJS(products);
    }
  },

  setType: function(type){
    this.type = type;
  },

  // if list is pass as params, it mean we want to display a list that is not from LocalStorage
  updateList: function(products = null){
    var products_list = products || this.products;
    var lists = this._createGroups(products_list);
    this._trigger();
  },

  setSortBy: function(type, direction){
    this.sortOptions = {
      type: type, 
      direction: direction
    };

    this._trigger();
  },
  
  _createGroups: function(products_list){
    // if(this.type !== null){
    //   var products_list = products_list.filter(p => p.type === this.type);
    // }

    // 1-filter product by current type
    // 2-create group based on current sort option
    // 3-reorder in each group


    // this.products.forEach()
  },

  _trigger: function(){
    this.trigger({
        products: this.products,
        sortOptions: this.sortOptions,
        type: this.type
    })
  },

  // this will be called by all listening components as they register their listeners
  getDefaultData: function() {
    this.initFromStorage();

    return {
      products: this.products,
      sortOptions: this.sortOptions,
      type: this.type
    }
  }
});

export default ProductListStore;