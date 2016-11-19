import { browserHistory } from 'react-router';
import {
  AUTH_ACCEPT,
  AUTH_DENIAL,
  AUTH_REVOKE,
  AUTH_ERROR,
  AUTH_IS_FETCHING,
  AUTH_IS_NOT_FETCHING
} from './types';
import { accessToken } from '../../api';
import { accessTokenStorage, refreshTokenStorage } from '../../utils/storage';

const authError = errMsg => ({
  type: AUTH_ERROR,
  payload: errMsg
});

const handleAuthAccept = (dispatch, code) => {
  dispatch({ type: AUTH_ACCEPT });
  dispatch({ type: AUTH_IS_FETCHING });

  return accessToken.retrieve(code)
    .then(data => {
      console.log(data);
      dispatch({ type: AUTH_IS_NOT_FETCHING });
      accessTokenStorage.set(data.access_token);
      refreshTokenStorage.set(data.refresh_token);
      browserHistory.push('/');
    })
    .catch(err => {
      const action = authError(err);
      return dispatch(action);
    })
};

const handleAuthFailure = (dispatch, error) => {
  switch(error) {
    case 'access_denied': {
      const msg = 'User chose not to grant your app permissions';

      return dispatch({
        type: AUTH_DENIAL,
        payload: msg
      });
    }
    case 'invalid_request': {
      let msg = 'There was an issue with the request sent to /api/v1/authorize.';
      msg += 'Double check the parameters being sent during the request to /api/v1/authorize above.';

      const action = authError(msg);
      return dispatch(action);
    }
    default: {
      const msg = `The developer has not handled this error: ${error}`

      const action = authError(msg);
      return dispatch(action);
    }
  }
};

export const handleAuthorization = queryParams => {
  return dispatch => {
    const { error, code } = queryParams;

    if (error) {
      return handleAuthFailure(dispatch, error);
    } else if (code) {
      return handleAuthAccept(dispatch, code);
    }
  };
};
