import { combineReducers } from 'redux'
import auth from './auth';
import subreddits from './subreddits';
import messages from './messages';
import posts from './posts';

const rootReducer = combineReducers({
  auth,
  subreddits,
  messages,
  posts
})

export default rootReducer
