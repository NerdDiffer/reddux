import { browserHistory } from 'react-router';
import {
  AUTH_HAS_TOKEN,
  AUTH_HAS_NO_TOKEN,
  AUTH_ACCEPT,
  AUTH_DENIAL,
  AUTH_REVOKE,
  AUTH_ERROR,
  AUTH_IS_FETCHING,
  AUTH_IS_NOT_FETCHING,
  MSG_SUCCESS,
  MSG_INFO,
  MSG_WARNING,
  MSG_ERROR
} from './types';
import { accessToken } from '../../api';
import { accessTokenStorage, refreshTokenStorage } from '../../utils/storage';

const authToken = (dispatch, hasToken) => {
  const type = hasToken ? AUTH_HAS_TOKEN : AUTH_HAS_NO_TOKEN;
  return dispatch({ type });
};

const authSuccess = (dispatch, msg) => {
  dispatch({ type: AUTH_ACCEPT });
  dispatch({ type: MSG_SUCCESS, payload: msg });
};

const authError = (dispatch, msg) => {
  dispatch({ type: AUTH_ERROR });
  dispatch({ type: MSG_ERROR, payload: msg });
};

const authDenial = (dispatch, msg) => {
  dispatch({ type: AUTH_DENIAL });
  dispatch({ type: MSG_INFO, payload: msg });
};

const handleAuthAccept = (dispatch, code) => {
  authSuccess(dispatch, 'You have authorized access');
  dispatch({ type: AUTH_IS_FETCHING });

  return accessToken.retrieve(code)
    .then(data => {
      console.log(data);
      dispatch({ type: AUTH_IS_NOT_FETCHING });
      accessTokenStorage.set(data.access_token);
      refreshTokenStorage.set(data.refresh_token);
      authToken(dispatch, true);
      browserHistory.push('/');
    })
    .catch(err => {
      return authError(dispatch, err);
    })
};

const handleAuthFailure = (dispatch, error) => {
  switch(error) {
    case 'access_denied': {
      accessTokenStorage.clear();
      refreshTokenStorage.clear();
      browserHistory.push('/');
      authToken(dispatch, false);
      const msg = 'You have denied access';
      return authDenial(dispatch, msg);
    }
    case 'invalid_request': {
      let msg = 'There was an issue with the request sent to /api/v1/authorize.';
      msg += 'Double check the parameters being sent during the request to /api/v1/authorize above.';
      return authError(dispatch, msg);
    }
    default: {
      const msg = `The developer has not handled this error: ${error}`
      return authError(dispatch, msg);
    }
  }
};

export const handleAuthCallback = queryParams => {
  return dispatch => {
    const { error, code } = queryParams;

    if (error) {
      return handleAuthFailure(dispatch, error);
    } else if (code) {
      return handleAuthAccept(dispatch, code);
    }
  };
};

export const checkForAuthToken = () => {
  const thunk = dispatch => {
    const hasToken = !!accessTokenStorage.get() || !!refreshTokenStorage.get();
    authToken(dispatch, hasToken);
  };

  return thunk;
};

export const handleRequestRefreshToken = () => {
  const thunk = dispatch => {
    const token = refreshTokenStorage.get();

    if (!token) {
      const msg = "Need something in 'localStorage.refresh_token' to do this";
      return authError(dispatch, msg);
    } else {
      dispatch({ type: AUTH_IS_FETCHING });

      return accessToken.refresh(token)
        .then(data => {
          console.log(data);
          accessTokenStorage.set(data.access_token);
          refreshTokenStorage.clear();
          authToken(dispatch, true);
          dispatch({ type: AUTH_IS_NOT_FETCHING });
        })
        .catch(err => {
          dispatch({ type: AUTH_IS_NOT_FETCHING });
          return authError(dispatch, err.toString());
        });
    }
  };

  return thunk;
};
