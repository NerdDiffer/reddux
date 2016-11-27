import { combineReducers } from 'redux'
import auth from './auth';
import subreddits from './subreddits';
import subscriptions from './subscriptions';
import messages from './messages';
import posts from './posts';

const rootReducer = combineReducers({
  auth,
  subreddits,
  subscriptions,
  messages,
  posts
})

export default rootReducer
