import * as subreddits from './subreddits';
import * as feed from './feed';
import * as accessToken from './accessToken';
import { stringifyData } from './_shared';

// https://github.com/reddit/reddit/wiki/OAuth2#authorization
const authUrl = (() => {
  const baseUrl = 'https://www.reddit.com/api/v1/authorize';
  const params = {
    client_id: process.env.REDDIT_CLIENT_ID,
    response_type: 'code',
    state: 'RANDOM_STRING',
    redirect_uri: 'http://localhost:8080/auth/callback',
    duration: 'permanent',
    scope: 'identity mysubreddits read subscribe'
  };
  const stringified = stringifyData(params);
  return `${baseUrl}?${stringified}`;
})();

export { authUrl, subreddits, accessToken, feed };
