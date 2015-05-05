import Reflux from 'reflux';
import ProductActions from '../actions/product_actions';

var ProductStore = Reflux.createStore({
  listenables: [ProductActions],
  init() {
    this.products = [];
  },

  onLoadProducts() {
    this.trigger({ 
      loading: true
    });
  },

  onLoadProductsSuccess(products) {
    this.products = products;

    this.trigger({ 
      products : this.products,
      loading: false
    });
  },

  onLoadProductsError(error) {
    this.trigger({ 
      error : error,
      loading: false
    });
  }

});

export default ProductStore;