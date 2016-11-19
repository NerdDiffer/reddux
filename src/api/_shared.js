import { stringify } from 'querystring';
import { accessTokenStorage } from '../utils/storage';

const { REDDIT_CLIENT_ID, REDDIT_SECRET } = process.env;

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

export const showError = err => {
  console.log(err);
  console.log(err.config);

  if (!err.response) {
    console.log(err.message);
  } else {
    const { status, headers, data } = err.response;
    console.log(status);
    console.log(headers);
    console.log(data);
  }
};
