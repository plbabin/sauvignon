import React from 'react';
import { Router, Route, NotFoundRoute, IndexRoute } from 'react-router';

import AppContainer from './containers/app.jsx';
import HomeContainer from './containers/home.jsx';
import InfoContainer from './containers/info.jsx';
import ProductListLovedContainer from './containers/product_list/loved.jsx';
import ProductListTotryContainer from './containers/product_list/totry.jsx';
import ProductListContainer from './containers/product_list.jsx';
import ProductContainer from './containers/product.jsx';
// import NotFound from './containers/notFound.jsx';

export default (
  <Route path="/" component={ AppContainer }>

    <Route path="products">
      <Route path="loved" component={ProductListLovedContainer}>
        <Route path=":productId" component={ProductContainer} />
      </Route>
      <Route path="totry" component={ProductListTotryContainer}>
        <Route path=":productId" component={ProductContainer} />
      </Route>
    </Route>

    <Route path="settings" component={ InfoContainer } />
    <Route path="stores" component={ InfoContainer } />
    <Route path="add" component={ InfoContainer } />

    <IndexRoute component={HomeContainer} />
  </Route>
);