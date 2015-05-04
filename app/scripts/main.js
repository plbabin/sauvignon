import React from 'react';
import Router from 'react-router';
import routes from './routes';

Router.run(routes, (Handler, state) => {
  var params = state.params;
  React.render(<Handler params={params} />, document.body);
});