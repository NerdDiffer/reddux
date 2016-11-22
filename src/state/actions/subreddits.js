import { browserHistory } from 'react-router';
import {
  AUTH_ERROR,
  SR_SUBSCRIBED_REPLACE_ALL,
  SR_SUBSCRIBED_ADD,
  SR_SUBSCRIBED_REM,
  SR_TO_SHOW,
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

const handleAuthError = (dispatch, msg) => {
  dispatch({ type: SR_IS_NOT_FETCHING });
  dispatch({ type: AUTH_ERROR });
  dispatch({ type: MSG_ERROR, payload: msg });
  browserHistory.push('/auth');
};

// index subscriptions (by url) for quick comparison
const mapSubredditsByUrl = arr => (
  arr.reduce((collection, { data }) => {
    const { url, name, display_name } = data;
    collection[url] = { fullname: name, display_name };
    return collection;
  }, {})
);

export const handleGetMySubreddits = () => {
  const thunk = dispatch => {
    dispatch({ type: SR_IS_FETCHING });

    return getMySubreddits()
      .then(res => {
        const { children } = res.data;
        dispatch({ type: SR_IS_NOT_FETCHING });
        dispatch({ type: SR_TO_SHOW, payload: children });
        dispatch({ type: SR_NAME_TO_SHOW, payload: 'My' });
        const subscribedTo = mapSubredditsByUrl(children);
        dispatch({ type: SR_SUBSCRIBED_REPLACE_ALL, payload: subscribedTo });
      })
      .catch(err => handleAuthError(dispatch, err.toString()));
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
        dispatch({ type: SR_TO_SHOW, payload: children });
        dispatch({ type: SR_NAME_TO_SHOW, payload: 'Popular' });
      })
      .catch(err => handleAuthError(dispatch, err.toString()));
  };

  return thunk;
};

export const handleSubscribe = ({ url, name, display_name }) => {
  const thunk = dispatch => {
    const params = { action: 'sub', sr: name };
    const payload = { url, name, display_name };

    return postToSubscription(params)
      .then(res => dispatch({ type: SR_SUBSCRIBED_ADD, payload }))
      .catch(err => handleAuthError(dispatch, err.toString()));
  };

  return thunk;
};

export const handleUnsubscribe = ({ url, name }) => {
  const thunk = dispatch => {
    const params = { action: 'unsub', sr: name };

    return postToSubscription(params)
      .then(res => dispatch({ type: SR_SUBSCRIBED_REM, payload: url }))
      .catch(err => handleAuthError(dispatch, err.toString()));
  };

  return thunk;
};
