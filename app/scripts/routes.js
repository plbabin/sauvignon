import React from 'react';
import { Router, Route, NotFoundRoute, IndexRoute } from 'react-router';

import App from './pages/app.jsx';
import Home from './pages/home.jsx';
import Info from './pages/info.jsx';
import ProductListLovedPage from './pages/product_list_loved_page.jsx';
import ProductListTotryPage from './pages/product_list_totry_page.jsx';
import ProductListPage from './pages/product_list_page.jsx';
import ProductPage from './pages/product_page.jsx';
// import NotFound from './pages/notFound.jsx';

var routes = (
  <Router>
    <Route path="/" component={ App }>

      <Route path="products">
        <Route path="loved" component={ProductListLovedPage}>
          <Route path=":productId" component={ProductPage} />
        </Route>
        <Route path="totry" component={ProductListTotryPage}>
          <Route path=":productId" component={ProductPage} />
        </Route>
      </Route>

      <Route path="settings" component={ Info } />
      <Route path="stores" component={ Info } />
      <Route path="add" component={ Info } />

      <IndexRoute component={Home} />
    </Route>
  </Router>
);

export default routes;