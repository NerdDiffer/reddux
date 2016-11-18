import { generateBasicHeader, showError } from './_shared';

const postForToken = (client, params) => {
  const url = 'https://www.reddit.com/api/v1/access_token';

  const { REDDIT_CLIENT_ID: username, REDDIT_SECRET: password } = process.env;

  const config = {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...generateBasicHeader(username, password)
    },
    cache: 'no-cache'
  },

  return fetch(url, config)
    .then(res => {
      console.log(res);
      return res.json()
    })
    .catch(err => {
      showError(err);
    });
};

// https://github.com/reddit/reddit/wiki/OAuth2#retrieving-the-access-token
export const retrieve = (client, code) => {
  const params = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: 'http://localhost:8080/oauth/callback'
  };

  return postForToken.call(null, client, params);
};

// https://github.com/reddit/reddit/wiki/OAuth2#refreshing-the-token
export const refresh = (client, refresh_token) => {
  const params = {
    grant_type: 'refresh_token',
    refresh_token
  };

  return postForToken.call(null, client, params);
};

// TODO: add code for revoking token (ie: when user logs out)
// https://github.com/reddit/reddit/wiki/OAuth2#manually-revoking-a-token
