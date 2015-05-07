import Reflux from 'reflux';

var ProductListActions = Reflux.createActions([
  // single
  'addProduct',
  'removeProduct',
  'moveProduct',
  'updateProduct',
  'getProducts',

  // lists  
  'setType',
  'setSortBy',
  'clearSortBy'
]);

export default ProductListActions;