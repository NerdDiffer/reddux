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

test('handles LISTS_POPULAR_SUBREDDITS', t => {
  const payload = ['frank', 'zappa'];
  const actual = reducer(prevState, { type: ActionTypes.LISTS_POPULAR_SUBREDDITS, payload });
  const expected = {
    subscriptions: {},
    popularSubreddits: ['frank', 'zappa'],
    feedQueue: []
  };

  t.deepEqual(actual, expected);
});
