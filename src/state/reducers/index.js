import { combineReducers } from 'redux'
import auth from './auth';
import subreddits from './subreddits';
import messages from './messages';

const rootReducer = combineReducers({
  auth,
  subreddits,
  messages
})

export default rootReducer
