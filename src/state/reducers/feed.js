import {
  POSTS_SOURCE,
  LISTS_FEED_REPLACE_ALL,
  POSTS_MULTIPLE_MODE_ON,
  POSTS_MULTIPLE_MODE_OFF,
} from '../constants/actionTypes';
import { FRONT_PAGE } from '../constants';

const FeedReducer = (prevState = {}, action) => {
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
    case LISTS_FEED_REPLACE_ALL: {
      return {
        ...prevState,
        items: action.payload
      };
    }
    default: {
      return prevState;
    }
  }
};

export default FeedReducer;
