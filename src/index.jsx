import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { configureStore, getInitialState } from './state/store';
import { AUTH_ACCEPT } from './state/actions/types';
import { accessTokenStorage } from './utils/storage';

const store = configureStore(getInitialState());

const accessToken = accessTokenStorage.get();
if (!!accessToken) {
  store.dispatch({ type: AUTH_ACCEPT });
}

import App from './components/App';
import Feed from './components/Feed/List';
import SubredditsList from './components/Subreddits/List';
import Authorize from './components/OAuth/Authorize';
import OAuthCallback from './components/OAuth/Callback';

// Route config
const routes = (
  <Route path="/" component={App}>
    <Route path="/subreddits" component={SubredditsList} />
    <Route path="/oauth" component={Authorize} />
    <Route path="/oauth/callback" component={OAuthCallback} />
    <Route path="/feed" component={Feed} />
  </Route>
);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('.mount')
);
