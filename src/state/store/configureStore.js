import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default initialState => (
  createStore(
    reducers,
    initialState,
    composeEnhancer(
      applyMiddleware(reduxThunk)
    )
  )
);
