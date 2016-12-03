import test from 'ava';
import reduxThunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import requireSrc from '../../proxyPaths';

const ActionTypes = requireSrc('constants', 'actionTypes');
const { toggleMultipleMode } = requireSrc('actions', 'feed');

const mockStore = configureMockStore([reduxThunk]);

test('dispatches when "isMultipleMode" is true', t => {
  // TODO: refactor source code or find another mocking library. This action
  // mutates store state mid-way through, and the redux-mock-store library does
  // not expose the mock store to reducers. Therefore, mock store's state is
  // frozen to whatever you initially set it at.
  const mockState = {
    feed: { isMultipleMode: true }
  };

  const store = mockStore(mockState);

  store.dispatch(toggleMultipleMode());

  const actual = store.getActions();
  const expected = [
    { type: ActionTypes.POSTS_MULTIPLE_MODE_OFF }
  ];

  t.deepEqual(actual, expected);
});

test('dispatches when "isMultipleMode" is false', t => {
  const mockState = {
    feed: { isMultipleMode: false }
  };

  const store = mockStore(mockState);

  store.dispatch(toggleMultipleMode());

  const actual = store.getActions();
  const expected = [
    { type: ActionTypes.POSTS_MULTIPLE_MODE_ON }
  ];

  t.deepEqual(actual, expected);
});
