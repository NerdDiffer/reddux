import Axios from 'axios';
import subreddits from './subreddits';
import buildAuthUrl from './buildAuthUrl';
import accessToken from './accessToken';

const client = Axios.create({
  baseURL: 'https://oauth.reddit.com'
});

export default client;
export { subreddits, buildAuthUrl, accessToken };
