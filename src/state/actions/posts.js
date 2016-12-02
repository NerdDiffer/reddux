import { browserHistory } from 'react-router';
import {
  POSTS_FETCHING,
  POSTS_SUCCESS,
  POSTS_ERROR,
  POSTS_FORCE_REFRESH,
  MSG_ERROR,
  AUTH_ERROR,
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
