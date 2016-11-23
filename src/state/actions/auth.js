import { browserHistory } from 'react-router';
import {
  AUTH_HAS_TOKEN,
  AUTH_HAS_NO_TOKEN,
  AUTH_ACCEPT,
  AUTH_DENIAL,
  AUTH_ERROR,
  AUTH_IS_FETCHING,
  AUTH_IS_NOT_FETCHING,
  AUTH_IS_REVOKING,
  AUTH_IS_NOT_REVOKING,
  MSG_SUCCESS,
  MSG_INFO,
  MSG_WARNING,
  MSG_ERROR,
  USER_IS_PREFETCHING,
  USER_IS_NOT_PREFETCHING
} from '../constants/actionTypes';
import {
  postForAccessToken,
  postForRefreshToken,
  postToRevokeToken
} from '../../api/accessToken';
import { accessTokenStorage, refreshTokenStorage } from '../../utils/storage';
import { handleGetMySubreddits, handleGetPopularSubreddits } from './subreddits';
import { fetchPostsIfNeeded } from './posts';
import { FRONT_PAGE } from '../constants';

const authToken = (dispatch, hasToken) => {
  const type = hasToken ? AUTH_HAS_TOKEN : AUTH_HAS_NO_TOKEN;
  return dispatch({ type });
};

const authRevoking = (dispatch, payload) => {
  const type = payload ? AUTH_IS_REVOKING : AUTH_IS_NOT_REVOKING;
  return dispatch({ type, payload });
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
  authSuccess(dispatch, {
    header: 'You have authorized access',
    content: 'Fetching subscriptions & content...'
  });
  dispatch({ type: AUTH_IS_FETCHING });

  const login = () => (
    postForAccessToken(code)
      .then(data => {
        console.log(data);
        dispatch({ type: AUTH_IS_NOT_FETCHING });
        accessTokenStorage.set(data.access_token);
        refreshTokenStorage.set(data.refresh_token);
        authToken(dispatch, true);
      })
      .catch(err => {
        return authError(dispatch, err);
      })
  );

  const loginAndPrefetch = () => (
    login()
      .then(() => dispatch({ type: USER_IS_PREFETCHING }))
      .then(() => dispatch(handleGetMySubreddits()))
      .then(() => dispatch(handleGetPopularSubreddits()))
      .then(() => dispatch(fetchPostsIfNeeded(FRONT_PAGE)))
      .then(() => dispatch({ type: USER_IS_NOT_PREFETCHING }))
  );

  return loginAndPrefetch()
    .then(() => {
      dispatch({
        type: MSG_SUCCESS,
        payload: { header: 'Success!', content: 'Enjoy Reddit' }
      });
      browserHistory.push('/feed');
    })
    .catch(err => console.log(err));
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
    const hasToken = !!accessTokenStorage.get();
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

      return postForRefreshToken(token)
        .then(data => {
          console.log(data);
          dispatch({ type: AUTH_IS_NOT_FETCHING });
          accessTokenStorage.set(data.access_token);
          authToken(dispatch, true);
          authSuccess(dispatch, 'You have authorized access again');
          browserHistory.push('/');
        })
        .catch(err => {
          dispatch({ type: AUTH_IS_NOT_FETCHING });
          const msg = {
            header: err.toString(),
            listItems: [
              'Sent an invalid refresh token.',
              'Try to revoke the token and re-authorize account.'
            ],
            content: null
          };
          return authError(dispatch, msg);
        });
    }
  };

  return thunk;
};

export const handleRevokeTokens = () => {
  const thunk = dispatch => {
    const access_token = accessTokenStorage.get();
    const refresh_token = refreshTokenStorage.get();

    const promises = [
      postToRevokeToken({ token: access_token, tokenType: 'access_token' }),
      postToRevokeToken({ token: refresh_token, tokenType: 'refresh_token' })
    ];

    authRevoking(dispatch, true);

    return Promise.all(promises)
      .then(res => {
        authRevoking(dispatch, false);
        dispatch({ type: AUTH_DENIAL });
        accessTokenStorage.clear();
        refreshTokenStorage.clear();
        authToken(dispatch, false);
        dispatch({ type: MSG_INFO, payload: 'You have revoked access to your account' });
        browserHistory.push('/auth');
      })
      .catch(err => {
        authRevoking(dispatch, false);
        return authError(dispatch, 'Client credentials invalid');
      })
  };

  return thunk;
};
