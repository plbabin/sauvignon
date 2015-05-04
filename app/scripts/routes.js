import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './pages/app.jsx';
import Home from './pages/home.jsx';
import Info from './pages/info.jsx';
import ProductListLoved from './pages/product_list_loved.jsx';
import ProductListTotry from './pages/product_list_totry.jsx';
import ProductList from './pages/product_list.jsx';
import Product from './pages/product.jsx';
import NotFound from './pages/notFound.jsx';

var routes = (
  <Route name="app" path="/" handler={ App }>
    
    <Route name="info" handler={ Info } />

    <Route path="products">
      <Route name="loved" path="loved" handler={ProductListLoved}>
        <Route path=":productId" handler={Product} />
      </Route>
      <Route name="totry" path="totry" handler={ProductListTotry}>
        <Route path=":productId" handler={Product} />
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