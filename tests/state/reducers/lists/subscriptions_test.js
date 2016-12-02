import test from 'ava';
import requireSrc from '../../proxyPaths';

const ActionTypes = requireSrc('constants', 'actionTypes');
const { FRONT_PAGE } = requireSrc('constants', 'index');
const reducer = requireSrc('reducers', 'lists').default;

let prevState = {};

test.beforeEach(t => {
  prevState = {
    subscriptions: {
      [FRONT_PAGE]: { name: FRONT_PAGE, url: FRONT_PAGE },
      'gadgets': { name: 't5_2qgzt', url: '/r/gadgets' },
      'news': { name: 't5_2qh3l', url: '/r/news' }
    }
  };
});

test('returns some default state', t => {
  const actual = reducer(undefined, { type: '' });
  const expected = { subscriptions: {}, feedQueue: [], popularSubreddits: [] };
  t.deepEqual(actual, expected);
});

test('handles replacing all subscriptions', t => {
  const newSubscriptions = {
    foo: { name: 't123', url: '/r/foo' },
    bar: { name: 't456', url: '/r/bar' }
  }

  const action = {
    type: ActionTypes.SUBSCRIPTIONS_REPLACE_ALL,
    payload: newSubscriptions
  };

  const actual = reducer(prevState, action);
  const expected = {
    feedQueue: [],
    popularSubreddits: [],
    subscriptions: {
      foo: { name: 't123', url: '/r/foo' },
      bar: { name: 't456', url: '/r/bar' }
    }
  };

  t.deepEqual(actual, expected);
});

test('handles adding a subscription', t => {
  const action = {
    type: ActionTypes.SUBSCRIPTIONS_ADD,
    payload: { display_name: 'pics', name: 't5_2qh0u', url: '/r/pics' }
  };

  const actual = reducer(prevState, action);
  const expected = {
    feedQueue: [],
    popularSubreddits: [],
    subscriptions: {
      [FRONT_PAGE]: { name: FRONT_PAGE, url: FRONT_PAGE },
      'gadgets': { name: 't5_2qgzt', url: '/r/gadgets' },
      'news': { name: 't5_2qh3l', url: '/r/news' },
      'pics': { name: 't5_2qh0u', url: '/r/pics' }
    }
  };

  t.deepEqual(actual, expected);
});

test('handles removing a subscription', t => {
  const action = {
    type: ActionTypes.SUBSCRIPTIONS_REM,
    payload: 'news'
  };

  const actual = reducer(prevState, action);
  const expected = {
    feedQueue: [],
    popularSubreddits: [],
    subscriptions: {
      [FRONT_PAGE]: { name: FRONT_PAGE, url: FRONT_PAGE },
      'gadgets': { name: 't5_2qgzt', url: '/r/gadgets' }
    }
  };

  t.deepEqual(actual, expected);
});
