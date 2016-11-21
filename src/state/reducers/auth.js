import {
  AUTH_HAS_TOKEN,
  AUTH_HAS_NO_TOKEN,
  AUTH_ACCEPT,
  AUTH_DENIAL,
  AUTH_ERROR,
  AUTH_IS_FETCHING,
  AUTH_IS_NOT_FETCHING,
  AUTH_IS_REVOKING,
  AUTH_IS_NOT_REVOKING
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
    case AUTH_IS_REVOKING: {
      return {
        ...prevState,
        isRevoking: true
      };
    }
    case AUTH_IS_NOT_REVOKING: {
      return {
        ...prevState,
        isRevoking: false
      };
    }
    case AUTH_HAS_TOKEN: {
      return {
        ...prevState,
        hasToken: true
      };
    }
    case AUTH_HAS_NO_TOKEN: {
      return {
        ...prevState,
        hasToken: false
      };
    }
    case AUTH_ACCEPT: {
      return {
        ...prevState,
        isAuthorized: true
      };
    }
    case AUTH_ERROR:
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
