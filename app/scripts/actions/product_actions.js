import Reflux from 'reflux';
import dataInterface from '../core/data-interface.js';
import ProductModel from '../models/product_model.js';

var ProductActions = Reflux.createActions([
  // single
  'add',
  'addSuccess',
  'addFail',

  'update',
  'updateSuccess',
  'updateFail'
]);


ProductActions.add.preEmit = function(product_id){
  dataInterface.get('/products/' + product_id)
  .then(function(data) {
    var p = new ProductModel(data); 
    ProductActions.addSuccess(p.id, p);
  })
  .catch(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR.stack);
    console.log(textStatus);
    console.log(errorThrown);
    ProductActions.addFail(product_id, textStatus, errorThrown);
  });

}

export default ProductActions;