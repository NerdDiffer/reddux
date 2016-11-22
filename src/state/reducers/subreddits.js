import {
  SR_SUBSCRIBED_REPLACE_ALL,
  SR_SUBSCRIBED_ADD,
  SR_SUBSCRIBED_REM,
  SR_TO_SHOW,
  SR_NAME_TO_SHOW,
  SR_IS_FETCHING,
  SR_IS_NOT_FETCHING,
} from '../constants/actionTypes';
import { FRONT_PAGE } from '../constants';

const SubredditsReducer = (prevState = {}, action) => {
  switch(action.type) {
    case SR_SUBSCRIBED_REPLACE_ALL: {
      return {
        ...prevState,
        subscribedTo: {
          [FRONT_PAGE]: { name: FRONT_PAGE, display_name: FRONT_PAGE },
          ...action.payload
        }
      };
    }
    case SR_SUBSCRIBED_ADD: {
      const { url, name, display_name } = action.payload;

      const newSubscribedTo = {
        [FRONT_PAGE]: { name: FRONT_PAGE, display_name: FRONT_PAGE },
        ...prevState.subscribedTo,
        [url]: { name, display_name }
      };

      return {
        ...prevState,
        subscribedTo: newSubscribedTo
      };
    }
    case SR_SUBSCRIBED_REM: {
      const newSubscribedTo = Object.assign({}, prevState.subscribedTo);
      delete newSubscribedTo[action.payload];

      return {
        ...prevState,
        subscribedTo: newSubscribedTo
      };
    }
    case SR_TO_SHOW: {
      return {
        ...prevState,
        collectionToShow: action.payload
      };
    }
    case SR_NAME_TO_SHOW: {
      return {
        ...prevState,
        nameOfCollectionToShow: action.payload
      };
    }
    case SR_IS_FETCHING: {
      return {
        ...prevState,
        isFetching: true
      };
    }
    case SR_IS_NOT_FETCHING: {
      return {
        ...prevState,
        isFetching: false
      };
    }
    default: {
      return prevState;
    }
  }
};

export default SubredditsReducer;
