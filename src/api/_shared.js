import { stringify } from 'querystring';
import { accessTokenStorage } from '../utils/storage';

const { REDDIT_CLIENT_ID, REDDIT_SECRET, NODE_ENV } = process.env;

export const redirect_uri = NODE_ENV === 'production' ?
  'https://reddux.herokuapp.com/auth/callback' :
  'http://localhost:8080/auth/callback';

const buildBearerAuthHeader = () => {
  const token = accessTokenStorage.get();
  return `Bearer ${token}`;
};

const buildBasicAuthHeader = () => {
  const username = REDDIT_CLIENT_ID;
  const password = REDDIT_SECRET;

  const str = `${username}:${password}`;
  const encoded = window.btoa(str); // base-64 encoding
  return `Basic ${encoded}`;
};

export const buildAuthorizationHeader = schema => {
  switch(schema.toLowerCase()) {
    case 'bearer':
      return buildBearerAuthHeader();
    case 'basic': {
      return buildBasicAuthHeader();
    }
    default: {
      return null;
    }
  }
};

export const stringifyData = data => stringify(data);

export const logError = err => {
  console.trace();
  console.log(err)
};

export const preProcessResponse = (res, { debug = false } = {}) => {
  if (!res.ok) {
    if (debug) { logError(res); }

    const { statusText } = res;
    throw Error(statusText);
  } else {
    return res.json()
  }
};
