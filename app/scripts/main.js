import React                from 'react'
import { render }           from 'react-dom'

import { Route }            from 'react-router';

import { reduxReactRouter, 
         routerStateReducer, 
         ReduxRouter }      from 'redux-router';

import { createHistory }    from 'history';
import routes               from './routes';

import { Provider }         from 'react-redux';
import * as reducers        from './reducers';
import promiseMiddleware    from './lib/promiseMiddleware';
import createLogger         from 'redux-logger';

import { createStore,
         compose,
         combineReducers,
         applyMiddleware }  from 'redux';


//const history = createBrowserHistory();
const logger = createLogger();

const reducer = combineReducers(
  Object.assign({
    router: routerStateReducer
  }, reducers)
);

const store = compose(
  applyMiddleware(promiseMiddleware, logger),
  reduxReactRouter({
    routes,
    createHistory
  })
  //devTools()
)(createStore)(reducer);

//history={history}
render(
  <Provider store={store}>
    <ReduxRouter children={routes} />
  </Provider>,
  document.getElementById('content') 
);