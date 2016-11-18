import Axios from 'axios';
import { stringify } from 'querystring';

import * as subreddits from './subreddits';
import getFrontPage from './frontPage';
import accessToken from './accessToken';

const client = Axios.create({
  baseURL: 'https://oauth.reddit.com'
});

// https://github.com/reddit/reddit/wiki/OAuth2#authorization
const authUrl = (() => {
  const baseUrl = 'https://www.reddit.com/api/v1/authorize';
  const params = {
    client_id: process.env.REDDIT_CLIENT_ID,
    response_type: 'code',
    state: 'RANDOM_STRING',
    redirect_uri: 'http://localhost:8080/oauth/callback',
    duration: 'permanent',
    scope: 'identity mysubreddits read subscribe'
  };
  const stringifiedParams = stringify(params);
  return `${baseUrl}?${stringifiedParams}`;
})();

export default client;
export { authUrl, subreddits, accessToken, getFrontPage };
