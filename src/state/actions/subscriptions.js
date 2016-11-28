import { browserHistory } from 'react-router';
import {
  AUTH_ERROR,
  SUBSCRIPTIONS_ADD,
  SUBSCRIPTIONS_REM,
  MSG_ERROR
} from '../constants/actionTypes';
import {
  postToSubscription
} from '../../api/subreddits';

const handleAuthError = (dispatch, err) => {
  dispatch({ type: AUTH_ERROR });

  const errorMessage = {
    header: err.toString(),
    listItems: ['Try refreshing your auth token.'],
    content: null
  };

  dispatch({ type: MSG_ERROR, payload: errorMessage });
  browserHistory.push('/auth');
};

export const handleSubscribe = ({ url, name, display_name }) => {
  const thunk = dispatch => {
    const params = { action: 'sub', sr_name: display_name };
    const payload = { url, name, display_name };

    return postToSubscription(params)
      .then(res => dispatch({ type: SUBSCRIPTIONS_ADD, payload }))
      .catch(err => handleAuthError(dispatch, err));
  };

  return thunk;
};

export const handleUnsubscribe = ({ display_name }) => {
  const thunk = dispatch => {
    const params = { action: 'unsub', sr_name: display_name };

    return postToSubscription(params)
      .then(res => dispatch({ type: SUBSCRIPTIONS_REM, payload: display_name }))
      .catch(err => handleAuthError(dispatch, err));
  };

  return thunk;
};
