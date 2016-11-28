import {
  SUBSCRIPTIONS_REPLACE_ALL,
  SUBSCRIPTIONS_ADD,
  SUBSCRIPTIONS_REM
} from '../constants/actionTypes';
import { FRONT_PAGE } from '../constants';

const SubscriptionsReducer = (prevState = {}, action) => {
  switch(action.type) {
    case SUBSCRIPTIONS_REPLACE_ALL: {
      return {
        ...prevState,
        subscribedTo: {
          [FRONT_PAGE]: { name: FRONT_PAGE, display_name: FRONT_PAGE },
          ...action.payload
        }
      };
    }
    case SUBSCRIPTIONS_ADD: {
      const { url, name, display_name } = action.payload;

      const newSubscribedTo = {
        [FRONT_PAGE]: { name: FRONT_PAGE, display_name: FRONT_PAGE },
        ...prevState.subscribedTo,
        [display_name]: { name, url }
      };

      return {
        ...prevState,
        subscribedTo: newSubscribedTo
      };
    }
    case SUBSCRIPTIONS_REM: {
      const newSubscribedTo = Object.assign({}, prevState.subscribedTo);
      delete newSubscribedTo[action.payload];

      return {
        ...prevState,
        subscribedTo: newSubscribedTo
      };
    }
    default: {
      return prevState;
    }
  }
};

export default SubscriptionsReducer;
