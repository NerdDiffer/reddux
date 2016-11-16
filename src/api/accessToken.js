import axios from 'axios';
import { showError } from './_shared';

const accessToken = (client, code) => {
  const url = '/api/v1/access_token';

  const params = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: 'http://localhost:8080/oauth/callback'
  };

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
    })
    .catch(err => {
      showError(err);
    });
};

export default accessToken;
