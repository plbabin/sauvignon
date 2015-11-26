import { CALL_API, Schemas } from '../lib/middleware/api';
import {PRODUCT_SEARCH_REQUEST, 
        PRODUCT_SEARCH_SUCCESS,
        PRODUCT_SEARCH_FAILURE} from '../constants/product';


// Fetches a list of products based on a search term
// Relies on the custom API middleware defined in ../middleware/api.js.
export function fetchProductSearch(term) {
  console.log('fetchProductSearch', term);
  return {
    term,
    [CALL_API]: {
      types: [ PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAILURE ],
      endpoint: `search/products`,
      params: {
        term
      },
      schema: Schemas.PRODUCT_ARRAY
    }
  }
}
