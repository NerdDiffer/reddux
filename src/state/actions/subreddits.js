import { browserHistory } from 'react-router';
import {
  AUTH_ERROR,
  SUBSCRIPTIONS_REPLACE_ALL,
  SUBSCRIPTIONS_ADD,
  SUBSCRIPTIONS_REM,
  SR_RECEIVE,
  SR_NAME_TO_SHOW,
  SR_IS_FETCHING,
  SR_IS_NOT_FETCHING,
  MSG_ERROR
} from '../constants/actionTypes';
import {
  getMySubreddits,
  getPopularSubreddits,
  postToSubscription
} from '../../api/subreddits';

const handleAuthError = (dispatch, err) => {
  dispatch({ type: SR_IS_NOT_FETCHING });
  dispatch({ type: AUTH_ERROR });
  const errorMessage = {
    header: err.toString(),
    listItems: ['Try refreshing your auth token.'],
    content: null
  };

  dispatch({ type: MSG_ERROR, payload: errorMessage });
  browserHistory.push('/auth');
};

/**
 * Index subreddits & subscriptions by url.
 * @return, {Object} collection of subreddits & subscriptions
 */
const mapSubsByUrl = arr => (
  arr.reduce((collection, { data }) => {
    const { subreddits, subscriptions } = collection;
    const { url, name, display_name } = data;

    subreddits[url] = data;
    subscriptions[url] = { fullname: name, display_name };

    return { subreddits, subscriptions };
  }, { subreddits: {}, subscriptions: {}})
);

export const handleGetMySubreddits = () => {
  const thunk = dispatch => {
    dispatch({ type: SR_IS_FETCHING });

    return getMySubreddits()
      .then(res => {
        const { children } = res.data;
        dispatch({ type: SR_IS_NOT_FETCHING });

        const { subscriptions, subreddits } = mapSubsByUrl(children);

        dispatch({ type: SR_NAME_TO_SHOW, payload: 'My' });
        dispatch({ type: SR_RECEIVE, payload: subreddits });
        dispatch({ type: SUBSCRIPTIONS_REPLACE_ALL, payload: subscriptions });
      })
      .catch(err => handleAuthError(dispatch, err));
  };

  return thunk;
};

export const handleGetPopularSubreddits = () => {
  const thunk = dispatch => {
    dispatch({ type: SR_IS_FETCHING });

    return getPopularSubreddits()
      .then(res => {
        const { children } = res.data;
        dispatch({ type: SR_IS_NOT_FETCHING });
        dispatch({ type: SR_RECEIVE, payload: children });
        dispatch({ type: SR_NAME_TO_SHOW, payload: 'Popular' });
      })
      .catch(err => handleAuthError(dispatch, err));
  };

  return thunk;
};

export const handleSubscribe = ({ url, name, display_name }) => {
  const thunk = dispatch => {
    const params = { action: 'sub', sr: name };
    const payload = { url, name, display_name };

    return postToSubscription(params)
      .then(res => dispatch({ type: SUBSCRIPTIONS_ADD, payload }))
      .catch(err => handleAuthError(dispatch, err));
  };

  return thunk;
};

export const handleUnsubscribe = ({ url, name }) => {
  const thunk = dispatch => {
    const params = { action: 'unsub', sr: name };

    return postToSubscription(params)
      .then(res => dispatch({ type: SUBSCRIPTIONS_REM, payload: url }))
      .catch(err => handleAuthError(dispatch, err));
  };

  return thunk;
};
