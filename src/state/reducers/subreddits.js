import {
  SR_SUBSCRIBED_REPLACE_ALL,
  SR_SUBSCRIBED_ADD,
  SR_SUBSCRIBED_REM,
  SR_TO_SHOW,
  SR_NAME_TO_SHOW,
  SR_IS_FETCHING,
  SR_IS_NOT_FETCHING,
} from '../constants/actionTypes';

const SubredditsReducer = (prevState = {}, action) => {
  switch(action.type) {
    case SR_SUBSCRIBED_REPLACE_ALL: {
      return {
        ...prevState,
        subscribedTo: action.payload
      };
    }
    case SR_SUBSCRIBED_ADD: {
      const { url, name } = action.payload;

      const newSubscribedTo = {
        ...prevState.subscribedTo,
        [url]: name
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
