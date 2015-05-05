import Reflux from 'reflux';

var ProductActions = Reflux.createActions([
  'loadProducts',
  'loadProductsSuccess',
  'loadProductsError'
]);

ProductActions.loadProducts.preEmit = function(data){
  // make your api call/ async stuff here
  // we use setTimeout for faking async behaviour here
  setTimeout(function(){
    var items = ['Foo', 'Bar', 'Lorem'];
    ProductActions.loadProductsSuccess(items);

    // on error
    // ProductActions.loadProductsError('an error occured');
  },500);
};

export default ProductActions;