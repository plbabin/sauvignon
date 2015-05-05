import Reflux from 'reflux';
import ProductActions from '../actions/product_actions';

var ProductStore = Reflux.createStore({

  init() {
    this.products = [];

    this.listenTo(ProductActions.loadProducts, this.loadProducts);
    this.listenTo(ProductActions.loadProductsSuccess, this.loadProductsSuccess);
    this.listenTo(ProductActions.loadProductsError, this.loadProductsError);
  },

  loadProducts() {
    this.trigger({ 
      loading: true
    });
  },

  loadProductsSuccess(products) {
    this.products = products;

    this.trigger({ 
      products : this.products,
      loading: false
    });
  },

  loadProductsError(error) {
    this.trigger({ 
      error : error,
      loading: false
    });
  }

});

export default ProductStore;