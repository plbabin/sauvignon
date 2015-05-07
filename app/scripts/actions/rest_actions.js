import reflux from "reflux";
import dataInterface from "../core/data-interface.js";

// Create actions
var RestActions = reflux.createActions([
  // Get
  "loadResource",
  "loadResourceSuccess",
  "loadResourceFail",

  // Create
  "createResource",
  "createResourceSuccess",
  "createResourceFail",

  // Update
  "updateResource",
  "updateResourceSuccess",
  "updateResourceFail",

  // Remove

  // Error
  "resourceNotFound"
]);

// Action handlers
RestActions.loadResource.listen(function(type, id, childrenType) {
  dataInterface.get([type, id, childrenType].filter(function(e){ return e; }).join("/"))
    .then(function(data) {
      RestActions.loadResourceSuccess(type, id, childrenType, data);
    })
    .catch(function(jqXHR, textStatus, errorThrown) {
      RestActions.loadResourceFail(type, id, childrenType, textStatus, errorThrown);
    });
});

RestActions.createResource.listen(function(type, data, navigateTo) {
  dataInterface.post([type].filter(function(e){ return e; }).join("/"), data)
    .then(function(resultData) {
      RestActions.createResourceSuccess(type, resultData);

      // Navigate to resource
      // if (navigateTo) {
      //   var router = require("local/core/router").router;
      //   var urlCreator = require("local/helper/resourceUrlCreator");
      //   var url = urlCreator(type, resultData);
      //   router.transitionTo(url);
      // }
    })
    .catch(function(jqXHR, textStatus, errorThrown) {
      RestActions.createResourceFail(type, textStatus, errorThrown);
    });
});

export default RestActions