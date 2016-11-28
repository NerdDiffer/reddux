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
 * @param options, {Object} named options
 *   @param subredditsOnly, {Boolean} if false, will only map subreddits.
 *   otherwise, maps both subscriptions and subreddits.
 * @return, {Object} collection of subreddits & subscriptions
 */
const mapSubsByDisplayName = (arr, { subredditsOnly = false } = {}) => {
  let init;
  let buildSubs;

  if (subredditsOnly) {
    init = { subreddits: {} };
    buildSubs = (collection, { data }) => {
      const { subreddits } = collection;
      const { display_name } = data;
      subreddits[display_name] = data;
      return { subreddits };
    };
  } else {
    init = { subreddits: {}, subscriptions: {} };
    buildSubs = (collection, { data }) => {
      const { subreddits, subscriptions } = collection;
      const { url, name, display_name } = data;

      subreddits[display_name] = data;
      subscriptions[display_name] = { name, url };

      return { subreddits, subscriptions };
    };
  }

  return arr.reduce(buildSubs, init);
};

export const handleGetMySubreddits = () => {
  const thunk = dispatch => {
    dispatch({ type: SR_IS_FETCHING });

    return getMySubreddits()
      .then(res => {
        const { children } = res.data;
        dispatch({ type: SR_IS_NOT_FETCHING });

        const { subscriptions, subreddits } = mapSubsByDisplayName(children);

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

        const { subreddits } = mapSubsByDisplayName(children, { subredditsOnly: true });
        dispatch({ type: SR_NAME_TO_SHOW, payload: 'Popular' });
        dispatch({ type: SR_RECEIVE, payload: subreddits });
      })
      .catch(err => handleAuthError(dispatch, err));
  };

  return thunk;
};

export const handleSubscribe = ({ url, name, display_name }) => {
  const thunk = dispatch => {
    const params = { action: 'sub', sr_name: display_name };
    const payload = { url, name, display_name };

    return postToSubscription(params)
      .then(res => dispatch({ type: SUBSCRIPTIONS_ADD, payload }))
      .catch(err => handleAuthError(dispatch, err));
  };

  return thunk;
};

export const handleUnsubscribe = ({ display_name }) => {
  const thunk = dispatch => {
    const params = { action: 'unsub', sr_name: display_name };

    return postToSubscription(params)
      .then(res => dispatch({ type: SUBSCRIPTIONS_REM, payload: display_name }))
      .catch(err => handleAuthError(dispatch, err));
  };

  return thunk;
};
