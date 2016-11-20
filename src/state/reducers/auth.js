import {
  AUTH_ACCEPT,
  AUTH_DENIAL,
  AUTH_REVOKE,
  AUTH_ERROR,
  AUTH_IS_FETCHING,
  AUTH_IS_NOT_FETCHING
} from '../actions/types';

const AuthReducer = (prevState = {}, action) => {
  switch(action.type) {
    case AUTH_IS_FETCHING: {
      return {
        ...prevState,
        isFetching: true
      };
    }
    case AUTH_IS_NOT_FETCHING: {
      return {
        ...prevState,
        isFetching: false
      };
    }
    case AUTH_ACCEPT: {
      return {
        ...prevState,
        isAuthorized: true
      };
    }
    case AUTH_ERROR:
    case AUTH_REVOKE:
    case AUTH_DENIAL: {
      return {
        ...prevState,
        isAuthorized: false
      };
    }
    default: {
      return prevState;
    }
  }
};

export default AuthReducer;
