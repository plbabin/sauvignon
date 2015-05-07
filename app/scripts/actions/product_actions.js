import Reflux from 'reflux';

var ProductActions = Reflux.createActions([
  // single
  'add',
  'remove',
  'move',
  'update',
  
  // lists  
  'setSortBy',
  'clearSortBy',
  'search'
]);

export default ProductActions;