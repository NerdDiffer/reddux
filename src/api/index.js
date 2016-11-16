import Axios from 'axios';
import * as subreddits from './subreddits';
import getFrontPage from './frontPage';
import accessToken from './accessToken';

const client = Axios.create({
  baseURL: 'https://oauth.reddit.com'
});

export default client;
export { subreddits, accessToken, getFrontPage };
