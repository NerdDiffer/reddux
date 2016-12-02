import { combineReducers } from 'redux'
import auth from './auth';
import subreddits from './subreddits';
import lists from './lists';
import messages from './messages';
import posts from './posts';
import feed from './feed'

const rootReducer = combineReducers({
  auth,
  subreddits,
  lists,
  messages,
  posts,
  feed
})

export default rootReducer
