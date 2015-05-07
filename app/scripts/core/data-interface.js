import Q from "q";
import dataProvider from "./sync-data-provider";
import devSettings from "../helpers/dev-settings";

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

  // Rest methods
  get(path, localOnly) {
    // Check for hydrated data
    var hydratedData = dataProvider.getDataByPath(path);
    if(Object.getOwnPropertyNames(hydratedData).length !== 0 || localOnly){
      this.response = hydratedData;

      if (localOnly && !this.response) {
        this.response = {};
      }
      return this;
    }
    else {
      var $ = require("jquery");
      var url = devSettings.url ? devSettings.url : "http://" + window.location.host;
      // Check if we need artificial server delay for testing
      return Q.when($.get(url + path)).delay((devSettings.serverDelay) ? devSettings.serverDelayValue : 0).then(function(result) {
        return result;
      });
    }
  }

  post(path, data) {
    var $ = require("jquery");
    var url = devSettings.url ? devSettings.url : "http://" + window.location.host;
    return Q.when($.post(url + path, data)).then(function(result) {
      return result;
    });
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
      callback(null, "", "");
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

export default DataInterface;