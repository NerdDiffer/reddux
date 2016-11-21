import {
  SR_SUBSCRIBED_REPLACE_ALL,
  SR_SUBSCRIBED_ADD,
  SR_SUBSCRIBED_REM,
  SR_TO_SHOW,
  SR_NAME_TO_SHOW,
  SR_IS_FETCHING,
  SR_IS_NOT_FETCHING,
} from '../constants/actionTypes';
import { subreddits } from '../../api';

const { getMySubreddits, getPopularSubreddits, postToSubscription } = subreddits;

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
      .catch(err => err);
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
      });
  };

  return thunk;
};

export const handleSubscribe = ({ url, name }) => {
  const thunk = dispatch => {
    const params = { action: 'sub', sr: name };
    const payload = { url, name };

    return postToSubscription(params)
      .then(res => dispatch({ type: SR_SUBSCRIBED_ADD, payload }));
  };

  return thunk;
};

export const handleUnsubscribe = ({ url, name }) => {
  const thunk = dispatch => {
    const params = { action: 'unsub', sr: name };

    return postToSubscription(params)
      .then(res => dispatch({ type: SR_SUBSCRIBED_REM, payload: url }));
  };

  return thunk;
};
