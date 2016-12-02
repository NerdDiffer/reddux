import test from 'ava';
import reduxThunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import requireSrc from '../../proxyPaths';

const ActionTypes = requireSrc('constants', 'actionTypes');
const { selectSource } = requireSrc('actions', 'feed');

const mockStore = configureMockStore([reduxThunk]);

test('throws error when "isMultipleMode" is true and passing a string', t => {
  const mockState = {
    feed: { isMultipleMode: true }
  };
  const store = mockStore(mockState);

  t.plan(1);

  return store.dispatch(selectSource('illegal'))
    .catch(err => {
      const actual = store.getActions();
      const expected = [
        { type: ActionTypes.MSG_ERROR, payload: err }
      ];

      t.deepEqual(actual, expected);
    });
});

test('throws error when "isMultipleMode" is false and passing an array', t => {
  const mockState = {
    feed: { isMultipleMode: false }
  };
  const store = mockStore(mockState);

  t.plan(1);

  return store.dispatch(selectSource(['illegal']))
    .catch(err => {
      const actual = store.getActions();
      const expected = [
        { type: ActionTypes.MSG_ERROR, payload: err }
      ];

      t.deepEqual(actual, expected);
    });
});

test('dispatches when "isMultipleMode" is true', t => {
  const mockState = {
    feed: { isMultipleMode: true }
  };
  const store = mockStore(mockState);

  const source = ['curly', 'larry', 'moe'];

  store.dispatch(selectSource(source))

  const actual = store.getActions();
  const expected = [
    { type: ActionTypes.POSTS_SOURCE, source }
  ];

  t.deepEqual(actual, expected);
});

test('dispatches when "isMultipleMode" is false', t => {
  const mockState = {
    feed: { isMultipleMode: false }
  };
  const store = mockStore(mockState);

  const source = 'The 3 Stooges'

  store.dispatch(selectSource(source))

  const actual = store.getActions();
  const expected = [
    { type: ActionTypes.POSTS_SOURCE, source }
  ];

  t.deepEqual(actual, expected);
});
