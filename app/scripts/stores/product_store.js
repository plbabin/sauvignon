import Reflux from 'reflux';
import ProductActions from '../actions/product_actions';
import RestActions from '../actions/rest_actions.js';
import _ from 'lodash'; 
import Immutable from 'immutable';

// some variables and helpers for our fake database stuff
var productCounter = 0,
    localStorageKey = "products";

var ProductStore = Reflux.createStore({
  // mixins: [restStoreMixin],
  listenables: [ProductActions, RestActions],
  storeName: "ProductStore",
  data: Immutable.Map({}),
  resourceDef: {
    type: "product",
    id: true,
    childrenType: null
  },
  init: function() {
    this.products = [];
    this.type     = 'love';

    this.sortOptions = {
      name: "type",
      dir: 'asc'
    };
  },

  getInitialState: function() {
    return this.data;
  }, 

  _trigger: function(){
    this.trigger({
        products: this.products,
        sortOptions: this.sortOptions,
        type: this.type
    })
  }

  // // this will be called by all listening components as they register their listeners
  // getDefaultData: function() {
  //   var loadedList = Persistence.read(localStorageKey);
  //   if (!loadedList) {
  //       // If no list is in localstorage, start out with a default one
  //       this.products = [];
  //   } else {
  //     this.products = _.map(JSON.parse(loadedList), (item) => {
  //         // just resetting the key property for each todo item
  //         item.key = productCounter++;
  //         return item;
  //     });
  //   }

  //   return {
  //     products: this.products,
  //     sortOptions: this.sortOptions,
  //     type: this.type
  //   }
  // }

});

export default ProductStore;