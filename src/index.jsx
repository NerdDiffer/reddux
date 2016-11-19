import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { configureStore, getInitialState } from './state/store';

const store = configureStore(getInitialState());

import App from './components/App';
import FrontPage from './components/FrontPage';
import SubredditsList from './components/Subreddits/List';
import Authorize from './components/OAuth/Authorize';
import OAuthCallback from './components/OAuth/Callback';

// Route config
const routes = (
  <Route path="/" component={App}>
    <Route path="/subreddits" component={SubredditsList} />
    <Route path="/oauth" component={Authorize} />
    <Route path="/oauth/callback" component={OAuthCallback} />
    <Route path="/front_page" component={FrontPage} />
  </Route>
);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('.mount')
);
