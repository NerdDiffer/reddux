import {
  POSTS_FETCHING,
  POSTS_SUCCESS,
  POSTS_ERROR,
  POSTS_FORCE_REFRESH,
  POSTS_SR_NAME
} from '../constants/actionTypes';
import { getFrontPage, getPosts } from '../../api/feed';
import { showError } from '../../api/_shared';

const FRONT_PAGE = '_front_page'; // store front-page posts at this key

/**
 * The variable, `sr_display_name`, refers to the `display_name` of the subreddit.
 * It should be the same as the `display_name` property that you'd get on an API
 * call to `/subreddits`. See: https://github.com/reddit/reddit/wiki/JSON#subreddit.
 *
 * On exception to this is the front page. I don't know how else to name this
 * and am not sure if the subReddit at, `/r/FrontPage`, is actually the front page
 * of reddit, or some other content entity with the same name...
 */

export const selectSubreddit = sr_display_name => ({
  type: POSTS_SR_NAME,
  payload: sr_display_name
});

const postsSuccess = (dispatch, sr_display_name, json) => {
  return dispatch({
    type: POSTS_SUCCESS,
    sr_display_name,
    items: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  });
};

const postsError = (dispatch, sr_display_name, err) => {
  showError(err);

  return dispatch({
    type: POSTS_ERROR,
    sr_display_name,
    errorMessage: err,
    receivedAt: Date.now()
  });
};

const fetchPosts = (dispatch, sr_display_name) => {
  dispatch({ type: POSTS_FETCHING, sr_display_name });

  if (sr_display_name === FRONT_PAGE) {
    return getFrontPage()
      .then(json => {
        return postsSuccess(dispatch, sr_display_name, json);
      })
      .catch(err => {
        return postsError(dispatch, sr_display_name, err);
      });
  } else {
    return getPosts(sr_display_name)
      .then(json => {
        return postsSuccess(dispatch, sr_display_name, json);
      })
      .catch(err => {
        return postsError(dispatch, sr_display_name, err);
      });
  }
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
