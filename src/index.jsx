import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App';
import Subreddits from './components/Subreddits';
import Authorize from './components/Authorize';

// Route config
const routes = (
  <Route path="/" component={App}>
    <Route path="/subreddits" component={Subreddits} />
    <Route path="/authorize" component={Authorize} />
  </Route>
);

render(
  <Router history={browserHistory} routes={routes} />,
  document.querySelector('.mount')
);
