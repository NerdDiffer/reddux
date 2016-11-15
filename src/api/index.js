import Axios from 'axios';
import subreddits from './subreddits';
import authorize from './authorization';

const client = Axios.create({
  baseURL: 'https://oauth.reddit.com'
});

export default client;
export { subreddits, authorize };
