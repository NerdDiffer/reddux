import { buildAuthorizationHeader, preProcessResponse } from './_shared';

/**
 * Get posts on the user's front-page. Attempts an authenticated call, so if
 * it's successful, then it'll be comprised of posts from user's subreddits.
 */
export const getFrontPage = ({ debug } = {}) => {
  const url = 'https://oauth.reddit.com/.json';
  const config = {
    headers: {
      'Authorization': buildAuthorizationHeader('bearer')
    }
  };

  return fetch(url, config)
    .then(res => preProcessResponse(res, { debug }));
};

/**
 * Get posts from an individual subreddit. Optionally pass a search criteria.
 * @param criteria, {String} must be one of: hot new random top controversial
 */
export const getPosts = (subreddit, { criteria = 'hot', debug } = {}) => {
  const url = `https://www.reddit.com/r/${subreddit}.json`;

  return fetch(url)
    .then(res => preProcessResponse(res, { debug }));
};
