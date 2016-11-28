import { combineReducers } from 'redux'
import auth from './auth';
import subreddits from './subreddits';
import lists from './lists';
import messages from './messages';
import posts from './posts';

const rootReducer = combineReducers({
  auth,
  subreddits,
  lists,
  messages,
  posts
})

export default rootReducer
