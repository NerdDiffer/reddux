import test from 'ava';
import reduxThunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import requireSrc from '../../proxyPaths';

const ActionTypes = requireSrc('constants', 'actionTypes');
const { forceRefresh } = requireSrc('actions', 'posts');

const mockStore = configureMockStore([reduxThunk]);

test('dispatches', t => {
  const store = mockStore();

  const sr_display_name = 'human name of subreddit';
  store.dispatch(forceRefresh(sr_display_name));

  const actual = store.getActions();
  const expected = [
    { type: ActionTypes.POSTS_FORCE_REFRESH, sr_display_name }
  ];

  t.deepEqual(actual, expected);
});
