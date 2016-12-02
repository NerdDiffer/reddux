import { browserHistory } from 'react-router';
import {
  POSTS_FETCHING,
  POSTS_SUCCESS,
  POSTS_ERROR,
  POSTS_FORCE_REFRESH,
  POSTS_SOURCE,
  MSG_ERROR,
  AUTH_ERROR,
  LISTS_FEED_QUEUE,
  LISTS_FEED_REPLACE_ALL,
  POSTS_MULTIPLE_MODE_ON,
  POSTS_MULTIPLE_MODE_OFF
} from '../constants/actionTypes';
import { FRONT_PAGE } from '../constants';
import { getFrontPage, getPosts } from '../../api/feed';

/**
 * The variable, `sr_display_name`, refers to the `display_name` of the subreddit.
 * It should be the same as the `display_name` property that you'd get on an API
 * call to `/subreddits`. See: https://github.com/reddit/reddit/wiki/JSON#subreddit.
 *
 * On exception to this is the front page. I don't know how else to name this
 * and am not sure if the subReddit at, `/r/FrontPage`, is actually the front page
 * of reddit, or some other content entity with the same name...
 */

/**
 * Select a source for posts.
 * @param source, {Array|String} The source to fetch & show subreddits
 *   if it's an array, it implies you're in multiple mode
 *   if it's a string, it implies you're in single mode
 */
export const selectSource = source => {
  const thunk = (dispatch, getState) => {
    const { isMultipleMode } = getState().feed;

    if (isMultipleMode && typeof source === 'string') {
      const payload = 'You are in multiple mode, but tried to set posts source as you were in single mode';
      dispatch({ type: MSG_ERROR, payload });
      Promise.reject(payload);
    } else if (!isMultipleMode && Array.isArray(source)) {
      const payload = 'You are in single mode, but tried to set posts source as you were in multiple mode';
      dispatch({ type: MSG_ERROR, payload });
      Promise.reject(payload);
    } else {
      dispatch({ type: POSTS_SOURCE, source });
    }
  };

  return thunk;
};

export const toggleMultipleMode = () => {
  const thunk = (dispatch, getState) => {
    const { isMultipleMode } = getState().feed;
    const type = isMultipleMode ? POSTS_MULTIPLE_MODE_OFF : POSTS_MULTIPLE_MODE_ON;

    return dispatch({ type });
  };

  return thunk;
};

export const updateFeedQueue = feedQueue => {
  const thunk = dispatch => {
    dispatch({ type: LISTS_FEED_QUEUE, payload: feedQueue });
  };
  return thunk;
};

const postsSuccess = (dispatch, sr_display_name, json) => {
  return dispatch({
    type: POSTS_SUCCESS,
    sr_display_name,
    items: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  });
};

const postsError = (dispatch, sr_display_name, errorMessage) => {
  return dispatch({
    type: POSTS_ERROR,
    sr_display_name,
    errorMessage,
    receivedAt: Date.now()
  });
};

const handleAuthError = (dispatch, sr_display_name, msg) => {
  dispatch({ type: AUTH_ERROR });
  dispatch({ type: MSG_ERROR, payload: msg });
  postsError(dispatch, sr_display_name, msg);
  browserHistory.push('/auth');
};

const fetchPosts = (dispatch, sr_display_name) => {
  dispatch({ type: POSTS_FETCHING, sr_display_name });

  const promise = sr_display_name === FRONT_PAGE ?
    getFrontPage() :
    getPosts(sr_display_name);

  return promise
    .then(json => {
      return postsSuccess(dispatch, sr_display_name, json);
    })
    .catch(err => {
      const errorMessage = {
        header: err.toString(),
        listItems: ['Try refreshing your auth token.'],
        content: null
      };

      return handleAuthError(dispatch, sr_display_name, errorMessage);
    });
};

const shouldFetchPosts = (allPosts, sr_display_name) => {
  const postsInSub = allPosts[sr_display_name];

  if (!postsInSub) {
    return true;
  } else if (postsInSub.isFetching) {
    return false;
  } else {
    return postsInSub.forceRefresh;
  }
};

export const fetchPostsIfNeeded = sr_display_name => {
  const thunk = (dispatch, getState) => {
    const { posts } = getState();

    if (shouldFetchPosts(posts, sr_display_name)) {
      return fetchPosts(dispatch, sr_display_name);
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };

  return thunk;
};

export const forceRefresh = sr_display_name => ({
  type: POSTS_FORCE_REFRESH,
  sr_display_name
});

// fetch posts from every subreddit in the `feedQueue`
export const fetchBulk = () => {
  const thunk = (dispatch, getState) => {
    const { feedQueue } = getState().lists;

    const promises = feedQueue.map(display_name => dispatch(fetchPostsIfNeeded(display_name)));

    return Promise.all(promises)
      .then(results => {
        const currentState = getState().posts;

        return feedQueue.map(display_name => {
          return currentState[display_name].items;
        });
      })
      .then(allItems => {
        const flattened = allItems.reduce((flat, items) => (flat.concat(items)), []);
        dispatch({ type: LISTS_FEED_REPLACE_ALL, payload: flattened });
      });
  };
  return thunk;
};
