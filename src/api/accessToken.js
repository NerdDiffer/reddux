import axios from 'axios';
import { showError } from './_shared';

const postForToken = (client, params) => {
  const url = '/api/v1/access_token';

  const config = {
    auth: {
      username: process.env.REDDIT_CLIENT_ID,
      password: process.env.REDDIT_SECRET,
    },
    'Content-Type': 'application/x-www-form-urlencoded',
    baseURL: 'https://www.reddit.com/'
  };

  return client.post(url, params, config)
    .then(res => {
      console.log(res);
      return res;
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
