import { combineReducers } from 'redux'
import auth from './auth';
import subreddits from './subreddits';

const rootReducer = combineReducers({
  auth,
  subreddits
})

export default rootReducer
