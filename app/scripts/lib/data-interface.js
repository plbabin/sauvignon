import dataProvider from './sync-data-provider';
import fetch from 'isomorphic-fetch';

// TODO: Remove the following eslint directive once
// https://github.com/babel/babel-eslint/issues/21#issuecomment-76796488 is resolved
/*eslint no-unused-vars: 1*/
class DataInterface {
  constructor() {
    this.inDom = true;
    this.response = {};
    this.error = false;
    this.profiling = false;
    this.profile = {
      get: [],
      post: []
    };
  }

  getUrl(path, params){
    var url = 'http://' + window.location.host + '/api' + path;
    console.log(url);
    if (params) {
      var params_string = [];
      Object.keys(params).forEach((key)=> {
        let obj = params[key];
        params_string.push(key+'='+obj);
      });
      url += '?'+params_string.join('&')
    }
    return url;
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  parseJSON(response) {
    return response.json()
  }

  // Rest methods
  get(path, params, localOnly) {
    // Check for hydrated data
    var hydratedData = dataProvider.getDataByPath(path);
    if (Object.getOwnPropertyNames(hydratedData).length !== 0 || localOnly) {
      this.response = hydratedData;

      if (localOnly && !this.response) {
        this.response = {};
      }
      return this;
    }
    else {
      // Check if we need artificial server delay for testing
      return fetch( this.getUrl(path, params))
        .then(this.checkStatus)
        .then(this.parseJSON);
    }
  }

  post(path, data) {
    return fetch( this.getUrl(path), {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(this.checkStatus)
        .then(this.parseJSON);
  }

  // Callbacks
  then(callback) {
    if (!this.error) {
      callback(this.response);
    }
    return this;
  };

  catch(callback) {
    if (this.error) {
      callback(null, '', '');
    }
    return this;
  };

  // Helper methods
  enableProfiling() {
    this.profiling = true;
  };

  disableProfiling() {
    this.profiling = false;
  };

  getProfile() {
    return this.profile;
  };
}

export default new DataInterface();
