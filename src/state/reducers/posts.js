import {
  POSTS_FETCHING,
  POSTS_SUCCESS,
  POSTS_ERROR,
  POSTS_FORCE_REFRESH,
  POSTS_SOURCE,
  POSTS_MULTIPLE_MODE_ON,
  POSTS_MULTIPLE_MODE_OFF,
} from '../constants/actionTypes';

const fallbackState = {
  isFetching: false,
  forceRefresh: false,
  items: []
};

const postsForSub = (prevState = fallbackState, action) => {
  switch (action.type) {
    case POSTS_FORCE_REFRESH: {
      return Object.assign({}, prevState, {
        forceRefresh: true
      });
    }
    case POSTS_FETCHING: {
      return Object.assign({}, prevState, {
        isFetching: true,
        forceRefresh: false
      });
    }
    case POSTS_SUCCESS: {
      const { items, receivedAt } = action;

      return Object.assign({}, prevState, {
        isFetching: false,
        forceRefresh: false,
        items,
        lastUpdated: receivedAt,
        errorMessage: null
      });
    }
    case POSTS_ERROR: {
      const { receivedAt, errorMessage } = action;

      return Object.assign({}, prevState, {
        isFetching: false,
        forceRefresh: false,
        lastUpdated: receivedAt,
        errorMessage
      });
    }
    default:
      return prevState
  }
};

const PostsReducer = (prevState = {}, action) => {
  switch (action.type) {
    case POSTS_SOURCE: {
      const newState = { source: action.source };
      return Object.assign({}, prevState, newState);
    }
    case POSTS_MULTIPLE_MODE_ON: {
      const newState = { isMultipleMode: true };
      return Object.assign({}, prevState, newState);
    }
    case POSTS_MULTIPLE_MODE_OFF: {
      const newState = { isMultipleMode: false };
      return Object.assign({}, prevState, newState);
    }
    case POSTS_FORCE_REFRESH:
    case POSTS_FETCHING:
    case POSTS_SUCCESS:
    case POSTS_ERROR: {
      const { sr_display_name } = action;
      const newPosts = postsForSub(prevState[sr_display_name], action);
      const newState = { [sr_display_name]: newPosts };
      return Object.assign({}, prevState, newState);
    }
    default:
      return prevState
  }
};

export default PostsReducer;
