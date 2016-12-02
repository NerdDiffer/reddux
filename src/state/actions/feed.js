import {
  MSG_ERROR,
  POSTS_SOURCE,
  LISTS_FEED_QUEUE,
  LISTS_FEED_REPLACE_ALL,
  POSTS_MULTIPLE_MODE_ON,
  POSTS_MULTIPLE_MODE_OFF
} from '../constants/actionTypes';
import { fetchPostsIfNeeded } from './posts';

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

export const replaceFeedItems = () => {
  const thunk = (dispatch, getState) => {
    const { feed, lists, posts } = getState();
    const { isMultipleMode, source } = feed;

    if (!isMultipleMode) {
      const stateAtSource = posts[source];
      const payload = stateAtSource.items;
      dispatch({ type: LISTS_FEED_REPLACE_ALL, payload });
    } else {
      const { feedQueue } = lists;

      // extract downloaded posts from each currently-selected subreddit
      const allItems = feedQueue.map(display_name => posts[display_name].items);

      // combine into one array. TODO: later, order them differently.
      // You could sort them in a separate action creator, or sort them 'live'
      // (insertion sort?) as you are extracting items from `posts` branch of state.
      const payload = allItems.reduce((flat, items) => (flat.concat(items)), []);
      dispatch({ type: LISTS_FEED_REPLACE_ALL, payload });
    }
  };

  return thunk;
};

export const toggleMultipleMode = () => {
  const thunk = (dispatch, getState) => {
    const { isMultipleMode, source } = getState().feed;

    // by dispatching state-dependent action creators so close together, *might*
    // have to deal with race conditions...
    if (isMultipleMode) {
      dispatch({ type: POSTS_MULTIPLE_MODE_OFF });

      const newSource = source[0] || null;
      // throws error if previous dispatch is not complete...
      dispatch(selectSource(newSource));
    } else {
      dispatch({ type: POSTS_MULTIPLE_MODE_ON });

      const newSource = [source];
      // throws error if previous dispatch is not complete...
      dispatch(selectSource(newSource));
    }

    dispatch(replaceFeedItems());
  };

  return thunk;
};

export const updateFeedQueue = feedQueue => {
  // TODO: should `selectSource` be called here as well? Under what conditions?
  const thunk = dispatch => {
    dispatch({ type: LISTS_FEED_QUEUE, payload: feedQueue });
  };
  return thunk;
};

// fetch posts from every subreddit in the `feedQueue`
export const fetchBulk = () => {
  const thunk = (dispatch, getState) => {
    const { feedQueue } = getState().lists;

    const promises = feedQueue.map(display_name => dispatch(fetchPostsIfNeeded(display_name)));

    return Promise.all(promises)
      .then(results => {
        dispatch(selectSource(feedQueue));
        dispatch(replaceFeedItems());
        dispatch(updateFeedQueue([]));
      });
  };

  return thunk;
};
