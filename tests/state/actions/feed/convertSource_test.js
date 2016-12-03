import test from 'ava';
import reduxThunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import requireSrc from '../../proxyPaths';

const ActionTypes = requireSrc('constants', 'actionTypes');
const { convertSource } = requireSrc('actions', 'feed');

const mockStore = configureMockStore([reduxThunk]);

test('dispatches when "isMultipleMode" is false', t => {
  const mockState = {
    feed: {
      isMultipleMode: false,
      source: ['curly', 'larry', 'moe']
    }
  };

  const store = mockStore(mockState);

  store.dispatch(convertSource());

  const actual = store.getActions();
  const expected = [
    { type: ActionTypes.POSTS_SOURCE, source: 'curly' }
  ];

  t.deepEqual(actual, expected);
});

test('dispatches when "isMultipleMode" is true', t => {
  const mockState = {
    feed: {
      isMultipleMode: true,
      source: 'curly'
    }
  };

  const store = mockStore(mockState);

  store.dispatch(convertSource());

  const actual = store.getActions();
  const expected = [
    { type: ActionTypes.POSTS_SOURCE, source: ['curly'] }
  ];

  t.deepEqual(actual, expected);
});
