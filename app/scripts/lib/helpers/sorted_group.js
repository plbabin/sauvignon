import Immutable from 'immutable';

import { SORT_TYPE_NAME,
         SORT_TYPE_CATEGORY,
         SORT_TYPE_PRICE,
         SORT_DESC,
         SORT_ASC } from '../../constants/sort'

// HELPERS method
function group_key_by_price(item){
  if(item.price_in_cents < 1000){
    return '<10$';
  }else if(item.price_in_cents < 2000){
    return '10$-20$'
  }else if(item.price_in_cents < 3000){
    return '20$-30$'
  }else if(item.price_in_cents < 5000){
    return '30$-50$'
  }else if(item.price_in_cents <= 10000){
    return '50$-100$'
  }else{
    return '100$+'
  }
}

function group_key_by_category(item){
  return item.subtype.name;
}

function getGroupKey(item, sort_type){
  switch(sort_type){
    case SORT_TYPE_PRICE:
      return group_key_by_price(item);
    case SORT_TYPE_CATEGORY:
      return group_key_by_category(item);
    default:
      return '*unknown group type*';
  }
}


//EXPORTED METHODDS
export function isGrouped(sort_type){
  switch(sort_type){
    case SORT_TYPE_NAME:
      return false;
    default:
      return true;
  }
}

export function group_items(items, sort_type, sort_order = SORT_ASC){
  if( !isGrouped(sort_type) ){
    return items;
  }

  let groups = {};

  items.forEach((item)=>{
    const groupKey = getGroupKey(item, sort_type);
    if(!groups[groupKey]){
      groups[groupKey] = [];
    }
    if(sort_order === SORT_ASC){
      groups[groupKey].push(item);
    }else{
      groups[groupKey] = [item].join(groups[groupKey]);
    }
  });

  let orderedMap = new Immutable.OrderedMap(groups);
  return orderedMap.map((list,k)=>{
    return new Immutable.List(list);
  });
}

export function sort_items(items, sort_type, sort_order = SORT_ASC){
  if(items.isEmpty()){
    return new Immutable.List();
  }

  // go through all product and create a new sort
  let sorted_items = items.sortBy((item)=>{
    switch(sort_type){
      case SORT_TYPE_NAME:
        return item.name;
      case SORT_TYPE_CATEGORY:
        return item.subtype.name;
      case SORT_TYPE_PRICE:
        return item.price_in_cents;
    }
  });

  sorted_items = group_items(sorted_items, sort_type, sort_order);

  if(sort_order === SORT_DESC){
    return sorted_items.reverse();
  }

  return sorted_items;
}