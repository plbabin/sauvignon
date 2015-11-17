import _ from 'lodash'; 

var SortMixin = {
  sortDirection:['ASC', 'DESC'],
  setSortBy: function(type, direction){
    if (!_.inArray(this.sortType, type)){
      type = _.first(this.sortType);
    }
    if (!_.inArray(this.sortDirection, direction)){
      direction = _.first(this.sortDirection);
    }

    this.sortOptions = {
      type: type, 
      direction: direction
    };

    if (!this._data_list){
      return this.updateList();
    }

    // do sorting again
    this.sortList();
    this._trigger();
  },
  setDefaultSortOptions: function(){
    this._sortOptions = {
      type: _.first(this.sortType), 
      direction: _.first(this.sortDirection)
    };
  },
  getSortOptions:function(){
    if (!this._sortOptions){
      this.setDefaultSortOptions();
    }

    return this._sortOptions;
  },
  setDataList: function(data){
    this._data_list = data;
  },
  getDataList: function(){
    return this._data_list;
  },
  sortList: function(){
    console.log('sort List');
    this._filtered_products = [];
    this._filtered_groups   = [];

    // 2-create group based on current sort option
    this.extractGroup();
    // 3-reorder in each group
  },
  extractGroup: function(){
    switch (this.getSortOptions().type){
      case 'type':
        this._extractTypeFromDataList();
      case 'price':
        return '';
      case 'name':
        return false;
      default:
        return '';
    }
  },
  _extractTypeFromDataList: function(){
    var groups = [];
    _.each(this._data_list, function(el){
      groups.push(el.subtype.name);
    });
    _.unique(groups);
    // _.order
  }
};

export default SortMixin;