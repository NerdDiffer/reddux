// Manage user subreddits
import { buildAuthorizationHeader, stringifyData, preProcessResponse } from './_shared';

const baseUrl = 'https://oauth.reddit.com';

const getSubreddits = endpoint => {
  const url = `${baseUrl}${endpoint}`;
  const config = {
    headers: {
      'Authorization': buildAuthorizationHeader('bearer')
    }
  };

  return fetch(url, config)
    .then(res => preProcessResponse(res));
};

export const getMySubreddits = getSubreddits.bind(null, '/subreddits/mine/subscriber');
export const getPopularSubreddits = getSubreddits.bind(null, '/subreddits/popular');

export const postToSubscription = params => {
  const url = `${baseUrl}/api/subscribe`;
  const body = stringifyData(params);

  const config = {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': buildAuthorizationHeader('bearer')
    },
    cache: 'no-cache'
  };

  return fetch(url, config)
    .then(res => preProcessResponse(res));
};
