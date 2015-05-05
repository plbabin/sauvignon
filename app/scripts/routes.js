import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './pages/app.jsx';
import Home from './pages/home.jsx';
import Info from './pages/info.jsx';
import ProductListLovedPage from './pages/product_list_loved_page.jsx';
import ProductListTotryPage from './pages/product_list_totry_page.jsx';
import ProductListPage from './pages/product_list_page.jsx';
import ProductPage from './pages/product_page.jsx';
import NotFound from './pages/notFound.jsx';

var routes = (
  <Route name="app" path="/" handler={ App }>
    
    <Route name="info" handler={ Info } />

    <Route path="products">
      <Route name="loved" path="loved" handler={ProductListLovedPage}>
        <Route path=":productId" handler={ProductPage} />
      </Route>
      <Route name="totry" path="totry" handler={ProductListTotryPage}>
        <Route path=":productId" handler={ProductPage} />
      </Route>
    </Route>

    <Route name="settings" handler={ Info } />
    <Route name="stores" handler={ Info } />
    <Route name="add" handler={ Info } />
    <Route name="home" handler={ Home } />

    <DefaultRoute handler={ Home } />
    <NotFoundRoute handler={ NotFound } />
  </Route>
);

export default routes;