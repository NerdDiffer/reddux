import test from 'ava';
import requireSrc from '../proxyPaths';

const ActionTypes = requireSrc('constants', 'actionTypes');
const reducer = requireSrc('reducers', 'auth').default;

let prevState;

test.beforeEach(t => {
  prevState = { foo: 'bar' };
});

test('returns some default state', t => {
  const actual = reducer(undefined, { type: '' });
  const expected = {};
  t.deepEqual(actual, expected);
});

test('handles AUTH_IS_FETCHING', t => {
  const actual = reducer(prevState, { type: ActionTypes.AUTH_IS_FETCHING });
  const expected = { foo: 'bar', isFetching: true };
  t.deepEqual(actual, expected);
});

test('handles AUTH_IS_NOT_FETCHING', t => {
  const actual = reducer(prevState, { type: ActionTypes.AUTH_IS_NOT_FETCHING });
  const expected = { foo: 'bar', isFetching: false };
  t.deepEqual(actual, expected);
});

test('handles USER_IS_PREFETCHING', t => {
  const actual = reducer(prevState, { type: ActionTypes.USER_IS_PREFETCHING });
  const expected = { foo: 'bar', isPrefetching: true };
  t.deepEqual(actual, expected);
});

test('handles USER_IS_NOT_PREFETCHING', t => {
  const actual = reducer(prevState, { type: ActionTypes.USER_IS_NOT_PREFETCHING });
  const expected = { foo: 'bar', isPrefetching: false };
  t.deepEqual(actual, expected);
});

test('handles AUTH_IS_REVOKING', t => {
  const actual = reducer(prevState, { type: ActionTypes.AUTH_IS_REVOKING });
  const expected = { foo: 'bar', isRevoking: true };
  t.deepEqual(actual, expected);
});

test('handles AUTH_IS_NOT_REVOKING', t => {
  const actual = reducer(prevState, { type: ActionTypes.AUTH_IS_NOT_REVOKING });
  const expected = { foo: 'bar', isRevoking: false };
  t.deepEqual(actual, expected);
});

test('handles AUTH_HAS_TOKEN', t => {
  const actual = reducer(prevState, { type: ActionTypes.AUTH_HAS_TOKEN });
  const expected = { foo: 'bar', hasToken: true };
  t.deepEqual(actual, expected);
});

test('handles AUTH_IS_NOT_REVOKING', t => {
  const actual = reducer(prevState, { type: ActionTypes.AUTH_HAS_NO_TOKEN });
  const expected = { foo: 'bar', hasToken: false };
  t.deepEqual(actual, expected);
});

test('handles AUTH_ACCEPT', t => {
  const actual = reducer(prevState, { type: ActionTypes.AUTH_ACCEPT });
  const expected = { foo: 'bar', isAuthorized: true };
  t.deepEqual(actual, expected);
});

test('handles AUTH_ERROR', t => {
  const actual = reducer(prevState, { type: ActionTypes.AUTH_ERROR });
  const expected = { foo: 'bar', isAuthorized: false };
  t.deepEqual(actual, expected);
});

test('handles AUTH_DENIAL', t => {
  const actual = reducer(prevState, { type: ActionTypes.AUTH_DENIAL });
  const expected = { foo: 'bar', isAuthorized: false };
  t.deepEqual(actual, expected);
});
