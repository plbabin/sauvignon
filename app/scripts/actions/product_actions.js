import * as types from '../constants/ProductTypes'

export function createProduct(product){
  return {
    type: CREATE_PRODUCT,
    product
  }
}

export function updateProduct(id, product){
  return {
    type: UPDATE_PRODUCT,
    id,
    product
  }
}

export function deleteProduct(id){
  return {
    type: 'DELETE_TODO',
    id
  };
}