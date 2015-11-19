import React                from 'react'
import { render }           from 'react-dom'
import { Router, Route }    from 'react-router';
import routes               from './routes';

import { Provider }         from 'react-redux';
import * as reducers        from './reducers';
import promiseMiddleware    from './lib/promiseMiddleware';
import createLogger         from 'redux-logger';

import { createStore,
         combineReducers,
         applyMiddleware }  from 'redux';


//const history = createBrowserHistory();
const logger = createLogger();
const reducer = combineReducers(reducers);
//let store = createStore(reducer);
const store   = applyMiddleware(promiseMiddleware, logger)(createStore)(reducer);

//history={history}
render(
  <Provider store={store}>
    <Router children={routes} />
  </Provider>,
  document.getElementById('content') 
);