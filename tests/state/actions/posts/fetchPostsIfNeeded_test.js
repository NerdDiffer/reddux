import test from 'ava';
import reduxThunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import mockFetch from 'fetch-mock';
import requireSrc from '../../proxyPaths';
import '../stubBrowserHistory';

const ActionTypes = requireSrc('constants', 'actionTypes');
const { fetchPostsIfNeeded } = requireSrc('actions', 'posts');

const mockStore = configureMockStore([reduxThunk]);
const sr_display_name = 'human name of subreddit';

// Restoring mockFetch in the "afterEach" won't work concurrent nature of ava.
// As long as you are mocking fetch on a per-test basis, stick to restoring mock
// fetch from within "beforeEach" hook instead.
test.beforeEach(t => {
  mockFetch.restore();
});

test('when already fetching subreddit, dispatches nothing', t => {
  const mockState = {
    posts: { [sr_display_name]: { isFetching: true } }
  };

  const store = mockStore(mockState);
  t.plan(1);

  return store.dispatch(fetchPostsIfNeeded(sr_display_name))
    .then(() => {
      const actual = store.getActions();
      const expected = [];
      t.deepEqual(actual, expected);
    });

});

test('when subreddit.forceRefresh is false, dispatches nothing', t => {
  const mockState = {
    posts: { [sr_display_name]: { forceRefresh: false } }
  };

  const store = mockStore(mockState);
  t.plan(1);

  return store.dispatch(fetchPostsIfNeeded(sr_display_name))
    .then(() => {
      const actual = store.getActions();
      const expected = [];
      t.deepEqual(actual, expected);
    });

});

test('when subreddit.forceRefresh is true, dispatches success actions', t => {
  mockFetch.get('*', {
    body: { data: { children: [] } },
    'status': 200
  });

  const mockState = {
    posts: { [sr_display_name]: { forceRefresh: true } }
  };

  const store = mockStore(mockState);
  t.plan(1);

  return store.dispatch(fetchPostsIfNeeded(sr_display_name))
    .then(() => {
      const actual = store.getActions();
      const actualActionTypes = actual.map(action => action.type);
      const expectedActionTypes = [
        ActionTypes.POSTS_FETCHING,
        ActionTypes.POSTS_SUCCESS
      ];

      t.deepEqual(actualActionTypes, expectedActionTypes);
    });
});

test('when no posts available, dispatches success actions', t => {
  mockFetch.get('*', {
    body: { data: { children: [] } },
    'status': 200
  });

  const mockState = {
    posts: { } // or whatever the fallback state is
  };

  const store = mockStore(mockState);
  t.plan(1);

  return store.dispatch(fetchPostsIfNeeded(sr_display_name))
    .then(() => {
      const actual = store.getActions();
      const actualActionTypes = actual.map(action => action.type);
      const expectedActionTypes = [
        ActionTypes.POSTS_FETCHING,
        ActionTypes.POSTS_SUCCESS
      ];

      t.deepEqual(actualActionTypes, expectedActionTypes);
    });
});

test('handles authentication error', t => {
  mockFetch.get('*', {
    body: { data: { children: [] } },
    'status': 401
  });

  const mockState = {
    posts: { [sr_display_name]: { forceRefresh: true } }
  };

  const store = mockStore(mockState);
  t.plan(1);

  return store.dispatch(fetchPostsIfNeeded(sr_display_name))
    .then(() => {
      const actual = store.getActions();
      const actualActionTypes = actual.map(action => action.type);
      const expectedActionTypes = [
        ActionTypes.POSTS_FETCHING,
        ActionTypes.AUTH_ERROR,
        ActionTypes.MSG_ERROR,
        ActionTypes.POSTS_ERROR
      ];

      t.deepEqual(actualActionTypes, expectedActionTypes);
    });
});
