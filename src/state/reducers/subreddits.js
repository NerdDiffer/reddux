import {
  SR_RECEIVE,
  SR_COLLECTION_TO_SHOW,
  SR_NAME_TO_SHOW,
  SR_IS_FETCHING,
  SR_IS_NOT_FETCHING,
} from '../constants/actionTypes';

const SubredditsReducer = (prevState = {}, action) => {
  switch(action.type) {
    case SR_RECEIVE: {
      const updatedCollection = {
        ...prevState.allSubs,
        ...action.payload
      };

      return {
        ...prevState,
        allSubs: updatedCollection
      };
    }
    case SR_COLLECTION_TO_SHOW: {
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
