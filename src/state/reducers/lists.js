import {
  SUBSCRIPTIONS_REPLACE_ALL,
  SUBSCRIPTIONS_ADD,
  SUBSCRIPTIONS_REM,
  LISTS_POPULAR_SUBREDDITS
} from '../constants/actionTypes';
import { FRONT_PAGE } from '../constants';

const SubscriptionsReducer = (prevState = {}, action) => {
  switch(action.type) {
    case SUBSCRIPTIONS_REPLACE_ALL: {
      return {
          // TODO: figure out how to get the front page into the Dropdown menu
          // of Feed/SelectSubreddit
          // [FRONT_PAGE]: { name: FRONT_PAGE, display_name: FRONT_PAGE },
          ...action.payload
      };
    }
    case SUBSCRIPTIONS_ADD: {
      const { url, name, display_name } = action.payload;

      const newSubscribedTo = {
        // TODO: figure out how to get the front page into the Dropdown menu
        // of Feed/SelectSubreddit
        // [FRONT_PAGE]: { name: FRONT_PAGE, display_name: FRONT_PAGE },
        ...prevState,
        [display_name]: { name, url }
      };

      return { ...newSubscribedTo };
    }
    case SUBSCRIPTIONS_REM: {
      const newSubscribedTo = Object.assign({}, prevState);
      delete newSubscribedTo[action.payload];

      return { ...newSubscribedTo };
    }
    default: {
      return prevState;
    }
  }
};

const ListsReducer = (prevState = { subscriptions: {}, popularSubreddits: {} }, action) => {
  switch(action.type) {
    case SUBSCRIPTIONS_REPLACE_ALL:
    case SUBSCRIPTIONS_ADD:
    case SUBSCRIPTIONS_REM: {
      return {
        ...prevState,
        subscriptions: SubscriptionsReducer(prevState.subscriptions, action)
      };
    }
    case LISTS_POPULAR_SUBREDDITS: {
      return {
        ...prevState,
        // contrary to `subscriptions`, this key references an array of strings
        popularSubreddits: action.payload
      };
    }
    default: {
      return prevState;
    }
  }
};

export default ListsReducer;
