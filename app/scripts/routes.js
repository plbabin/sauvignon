import React from 'react';
import { Router, Route, NotFoundRoute, IndexRoute } from 'react-router';

import AppContainer from './containers/app_container';
import HomeContainer from './containers/home_container';
import InfoContainer from './containers/info_container';
import ProductListLovedContainer from './containers/product_list/loved_container';
import ProductListTotryContainer from './containers/product_list/totry_container';
import ProductContainer from './containers/product_container';
import ProductAddContainer from './containers/product_add_container';
// import NotFound from './containers/notFound';

export default (
  <Route path="/" component={ AppContainer }>

    <Route path="products">
      <Route path="loved" component={ProductListLovedContainer}/>
      <Route path="totry" component={ProductListTotryContainer}/>
    </Route>

    <Route path="product">
      <Route name="product-add" path="add" component={ProductAddContainer} />
      <Route path=":itemId" component={ProductContainer} />
    </Route>

    <Route path="settings" component={ InfoContainer } />
    <Route path="stores" component={ InfoContainer } />

    <IndexRoute name="home" component={HomeContainer} />
  </Route>
);