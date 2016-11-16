import { stringify } from 'querystring';

const buildAuthUrl = () => {
  const baseUrl = 'https://www.reddit.com/api/v1/authorize';
  const params = {
    client_id: process.env.REDDIT_CLIENT_ID,
    response_type: 'code',
    state: 'RANDOM_STRING',
    redirect_uri: 'http://localhost:8080/oauth/callback',
    duration: 'temporary',
    scope: 'identity mysubreddits read'
  };
  const stringifiedParams = stringify(params);
  return `${baseUrl}?${stringifiedParams}`;
};

export default buildAuthUrl;
