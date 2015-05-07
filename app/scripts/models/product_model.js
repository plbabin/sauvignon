import _ from 'lodash';
import Persistence from '../core/persistence.js';

var localStorageKey = 'products';
class ProductModel {
  constructor(data = null) {
    this.desc   = null;
    this.rating = null;
    this._loaded = false;

    if(data){
      if( _.isNumber(data) ){
        this.initFromStorage(data);
      }else if(_.isObject(data)){
        this.initFromData(data); 
      }else{
        throw new Exception('data is not valid');
      }
    }
  }

  loaded(){
    return this._loaded;
  }

  initFromData(data){ 
    _.assign(this, data);
    this._loaded = true;
    this.save();
  }

  initFromStorage(id){
    var products = Persistence.read(localStorageKey);

    if(products[id]){
      _.assign(this, products[id]);
      this._loaded = true;
    }
  }

  save(){
    var products = Persistence.read(localStorageKey) || {};
    products[this.id] = this;
    Persistence.write(localStorageKey, products);
  }

}

export default ProductModel