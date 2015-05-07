import Reflux from 'reflux';
import ProductListActions from '../actions/product_list_actions';
import Persistence from '../core/persistence.js';
import _ from 'lodash'; 
import ProductModel from '../models/product_model.js';

// some variables and helpers for our fake database stuff
var productCounter = 0,
    localStorageKey = "products_lists";

var ProductListStore = Reflux.createStore({
  listenables: [ProductListActions],
  init: function() {
    // var r = new ProductInfo({id:1, desc:'test', rating: 4});
    this.type = null;

    var element_obj = {
      product_id:1287464,
      rating:4,
      note:'dsfkhjgdfjhgf'
    };
  },

  initFromStorage: function(){
    this.lists = Persistence.read(localStorageKey);
    if (!this.lists) {
        // If no list is in localstorage, start out with a default one
        this.lists = {
          'love':[],
          'totry':[]
        };
    }
  },

  addProduct: function(product, rating = null, note = null){
    if( _.isNumber(product) ){
      product = new ProductModel(product);
    }

    if(product.loaded()){
      var in_other_list   = _.find(this.lists[this._getOtherListType()], {product_id:product.id});
      if(in_other_list){
        ProductListActions.moveProduct(product, this.type, this._getOtherListType());
      }else{
        var in_current_list = _.find(this.lists[this.type], {product_id:product.id});
        if(!in_current_list){
          this.lists[this.type].push({product_id: product.id, rating:rating, note: note});
        }
      }
    }
    this._save();
  },

  moveProduct: function(product, from_list, to_list){
    console.log("move");
  },

  setType: function(type){
    this.type = type;
  },

  // if list is pass as params, it mean we want to display a list that is not from LocalStorage
  updateList: function(products = null){
    this.products_list = products || this._extractProductsFromList();

    this._doGroupsAndSorting();

    this._trigger();
  },

  setFilterBy: function(){
    // this.products_list = this._extractProductsFromList();
  },

  setSortBy: function(type, direction){
    this.sortOptions = {
      type: type, 
      direction: direction
    };

    if(!this.products_list){
      return this.updateList();
    }

    // do sorting again
    this._doGroupsAndSorting();
    this._trigger();
  },

  _save: function(){
    Persistence.write(localStorageKey, this.lists);
  },
  
  _doGroupsAndSorting: function(){
    console.log('groups creating', this.products_list);
    // if(this.type !== null){
    //   var products_list = products_list.filter(p => p.type === this.type);
    // }

    // 1-filter product by current type
    // 2-create group based on current sort option
    // 3-reorder in each group


    // this.products.forEach()
  },

  _doFiltering: function(p){
    return p;
  },

  _extractProductsFromList:function(){
    var list = _.map(this.lists[this.type], (o)=>{
      let p = new ProductModel(o.id);

      // we shoud do filtering here, base on filter criteria
      return this._doFiltering(p);
    });
    
    return _.filter(list, (o)=> o !== false);
  },

  _getOtherListType: function(){
    if(this.type == 'love'){
      return 'totry';
    }else{
      return 'love';
    }
  },

  _trigger: function(){
    this.trigger({
        products: [],
        sortOptions: this.sortOptions,
        type: this.type
    })
  },

  // this will be called by all listening components as they register their listeners
  getDefaultData: function() {
    this.initFromStorage();

    return {
      products: [],
      sortOptions: this.sortOptions,
      type: this.type
    }
  }
});

export default ProductListStore;