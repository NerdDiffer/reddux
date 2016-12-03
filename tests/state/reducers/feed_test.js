import test from 'ava';
import requireSrc from '../proxyPaths';

const ActionTypes = requireSrc('constants', 'actionTypes');
const reducer = requireSrc('reducers', 'feed').default;

let prevState;

test.beforeEach(t => {
  prevState = {
    source: null,
    isMultipleMode: null,
    items: null
  };
});

test('returns some default state', t => {
  const actual = reducer(undefined, { type: '' });
  const expected = {};
  t.deepEqual(actual, expected);
});

test('handles POSTS_SOURCE', t => {
  const newSource = ['frank', 'zappa'];
  const actual = reducer(prevState, { type: ActionTypes.POSTS_SOURCE, source: newSource });
  const expected = { isMultipleMode: null, items: null, source: newSource };
  t.deepEqual(actual, expected);
});

test('handles POSTS_MULTIPLE_MODE_ON', t => {
  const actual = reducer(prevState, { type: ActionTypes.POSTS_MULTIPLE_MODE_ON });
  const expected = { isMultipleMode: true, items: null, source: null };
  t.deepEqual(actual, expected);
});

test('handles POSTS_MULTIPLE_MODE_OFF', t => {
  const actual = reducer(prevState, { type: ActionTypes.POSTS_MULTIPLE_MODE_OFF });
  const expected = { isMultipleMode: false, items: null, source: null };
  t.deepEqual(actual, expected);
});

test('handles LISTS_FEED_REPLACE_ALL', t => {
  const newFeed = ['mothers', 'of', 'invention'];
  const actual = reducer(prevState, { type: ActionTypes.LISTS_FEED_REPLACE_ALL, payload: newFeed });
  const expected = { isMultipleMode: null, items: newFeed, source: null };
  t.deepEqual(actual, expected);
});
