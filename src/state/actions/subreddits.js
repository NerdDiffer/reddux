import { browserHistory } from 'react-router';
import {
  AUTH_ERROR,
  SUBSCRIPTIONS_REPLACE_ALL,
  SR_RECEIVE,
  SR_COLLECTION,
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
const mapSubsByDisplayName = arr => {
  const init = { subreddits: {}, subscriptions: {} };
  const buildSubs = (collection, { data }) => {
    const { subreddits, subscriptions } = collection;
    const { url, name, display_name } = data;

    subreddits[display_name] = data;
    subscriptions[display_name] = { name, url };

    return { subreddits, subscriptions };
  };

  return arr.reduce(buildSubs, init);
};

const mapPopularSubs = arr => {
  const init = { subreddits: {}, names: [] };

  const buildSubs = (collection, { data }) => {
    const { subreddits, names } = collection;
    const { display_name } = data;

    subreddits[display_name] = data;
    names.push(display_name);

    return { subreddits, names };
  };

  return arr.reduce(buildSubs, init);
};

export const showSubredditCollection = (namesBasedOn, nameOfCollection) => {
  const thunk = (dispatch, getState) => {
    dispatch({ type: SR_NAME_TO_SHOW, payload: nameOfCollection });

    const allSubs = getState().subreddits.allSubs;

    const collectionToShow = namesBasedOn.map(display_name => {
      return allSubs[display_name];
    }, []);

    dispatch({ type: SR_COLLECTION, payload: collectionToShow });
  };

  return thunk;
};

export const handleGetMySubreddits = () => {
  const thunk = (dispatch, getState) => {
    dispatch({ type: SR_IS_FETCHING });

    return getMySubreddits()
      .then(res => {
        const { children } = res.data;
        dispatch({ type: SR_IS_NOT_FETCHING });

        const { subscriptions, subreddits } = mapSubsByDisplayName(children);

        dispatch({ type: SR_RECEIVE, payload: subreddits });
        dispatch({ type: SUBSCRIPTIONS_REPLACE_ALL, payload: subscriptions });
      })
      .then(() => {
        const names = Object.keys(getState().subscriptions.subscribedTo);
        dispatch(showSubredditCollection(names, 'My'));
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

        const { subreddits, names } = mapPopularSubs(children);
        dispatch({ type: SR_RECEIVE, payload: subreddits });
        return names;
      })
      .then(namesOfPopularSubs => {
        dispatch(showSubredditCollection(namesOfPopularSubs, 'Popular'));
      })
      .catch(err => handleAuthError(dispatch, err));
  };

  return thunk;
};
