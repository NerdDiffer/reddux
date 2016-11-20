import {
  SR_SUBSCRIBED_REPLACE_ALL,
  SR_SUBSCRIBED_ADD,
  SR_SUBSCRIBED_REM,
  SR_TO_SHOW,
  SR_IS_FETCHING,
  SR_IS_NOT_FETCHING,
} from '../actions/types';
import { subreddits } from '../../api';

const { getMySubreddits, getPopularSubreddits, postToSubscription } = subreddits;

// index subscriptions (by url) for quick comparison
const mapSubredditsByUrl = arr => (
  arr.reduce((collection, { data }) => {
    const { url, name } = data;
    collection[url] = name;
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
        const subscribedTo = mapSubredditsByUrl(children);
        dispatch({ type: SR_SUBSCRIBED_REPLACE_ALL, payload: subscribedTo });
      })
      .catch(err => err);
      //this.setState({
      //  nameOfSelectedCollection: 'My',
      //});
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
        //this.setState({
        //  nameOfSelectedCollection: 'Popular',
        //});
      });
  };

  return thunk;
};

export const handleSubscribe = subredditName => {
  const thunk = dispatch => {
    const params = { action: 'sub', sr: subredditName };
    console.log(params);
    // TODO: handle response, update state, etc
    return postToSubscription(params)
      .then(res => {
        dispatch({ type: SR_SUBSCRIBED_ADD, payload: subredditName })
      })
  };

  return thunk;
};

export const handleUnsubscribe = subredditName => {
  const thunk = dispatch => {
    const params = { action: 'unsub', sr: subredditName };
    console.log(params);
    // TODO: handle response, update state, etc
    postToSubscription(params);
  };

  return thunk;
};
