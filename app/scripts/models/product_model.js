var localStorageKey = 'products';
class ProductModel {
  constructor(data = null) {
    this.desc   = null;
    this.rating = null;
    this.type   = null;
    
    if(data){
      if( _.isNumber(data) ){
        this.initFromStorage(id);
      }else if(_.isObject(data)){
        this.initFromData(data); 
      }else{
        throw new Exception('data is not valid');
      }
    }
  }

  initFromData(data){
    this.id     = data.id;
    data.forEach((k,v)=> this[k] = v); 
  }

  initFromStorage(id){

  }

  toJSON(){

  }

  fromJSON(){

  }

}

export default ProductModel