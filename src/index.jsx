import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { configureStore, getInitialState } from './state/store';
import { checkForAuthToken } from './state/actions/auth';

const store = configureStore();
store.dispatch(checkForAuthToken());

import App from './components/App';
import Feed from './components/Feed/List';
import SubredditsList from './components/Subreddits/List';
import OAuthPanel from './components/OAuth';
import OAuthCallback from './components/OAuth/Callback';

// Route config
const routes = (
  <Route path="/" component={App}>
    <Route path="/subreddits" component={SubredditsList} />
    <Route path="/oauth" component={OAuthPanel} />
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
