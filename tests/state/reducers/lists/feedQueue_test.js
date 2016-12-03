import test from 'ava';
import requireSrc from '../../proxyPaths';

const ActionTypes = requireSrc('constants', 'actionTypes');
const reducer = requireSrc('reducers', 'lists').default;

let prevState;

test.beforeEach(t => {
  prevState = {
    subscriptions: {},
    popularSubreddits: [],
    feedQueue: []
  };
});

test('returns some default state', t => {
  const actual = reducer(undefined, { type: '' });
  const expected = prevState;
  t.deepEqual(actual, expected);
});

test('handles LISTS_FEED_QUEUE', t => {
  const payload = ['frank', 'zappa'];
  const actual = reducer(prevState, { type: ActionTypes.LISTS_FEED_QUEUE, payload });
  const expected = {
    subscriptions: {},
    popularSubreddits: [],
    feedQueue: ['frank', 'zappa']
  };

  t.deepEqual(actual, expected);
});

// App seems to be working fine when replacing the entire queue with LISTS_FEED_QUEUE
test.todo('consider removing LISTS_FEED_QUEUE_ADD action type');
test.todo('consider removing LISTS_FEED_QUEUE_REM action type');
