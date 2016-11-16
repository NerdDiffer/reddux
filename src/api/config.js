import { stringify } from 'querystring';

export const setAuthorizationHeader = () => {
  const { REDDIT_CLIENT_ID, REDDIT_SECRET, REDDIT_ACCESS_TOKEN } = process.env;
  const authValue = `Bearer ${REDDIT_ACCESS_TOKEN}`;
  return { 'Authorization': authValue };
};

export const authUrl = (() => {
  const baseUrl = 'https://www.reddit.com/api/v1/authorize';
  const params = {
    client_id: process.env.REDDIT_CLIENT_ID,
    response_type: 'code',
    state: 'RANDOM_STRING',
    redirect_uri: 'http://localhost:8080/oauth/callback',
    duration: 'temporary',
    scope: 'identity mysubreddits read subscribe'
  };
  const stringifiedParams = stringify(params);
  return `${baseUrl}?${stringifiedParams}`;
})();
