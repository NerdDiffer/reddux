// Manage user subreddits
import { generateBearerHeader, showError } from './_shared';
import { stringify } from 'querystring';

const baseUrl = 'https://oauth.reddit.com';

const getSubreddits = endpoint => {
  const url = `${baseUrl}/${endpoint}`;
  const config = {
    headers: generateBearerHeader()
  };

  return fetch(url, config)
    .then(res => {
      console.log(res);
      return res.json();
    })
    .catch(err => {
      showError(err);
      return err;
    });
};

export const getMySubreddits = getSubreddits.bind(null, '/subreddits/mine/subscriber');
export const getPopularSubreddits = getSubreddits.bind(null, '/subreddits/popular');

export const postToSubscription = params => {
  const url = `${baseUrl}/api/subscribe`;
  const body = stringify(params);

  const config = {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...generateBearerHeader()
    },
    cache: 'no-cache'
  };

  return fetch(url, config)
    .then(res => {
      console.log(res);
      return res.json();
    })
    .catch(err => {
      showError(err);
    });
};
