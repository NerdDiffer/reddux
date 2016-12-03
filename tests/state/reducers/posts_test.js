import test from 'ava';
import requireSrc from '../proxyPaths';
import { isObject } from '../../assertions';

const ActionTypes = requireSrc('constants', 'actionTypes');
const { FRONT_PAGE } = requireSrc('constants', 'index');
const reducer = requireSrc('reducers', 'posts').default;

const dummySub = 'dummySub';
let prevStateForSub = {};

test.beforeEach(t => {
  prevStateForSub = {
    isFetching: null, // boolean
    forceRefresh: null, // boolean
    items: null, // array
    lastUpdated: null, // integer, (unix timestamp)
    errorMessage: null // string
  };
});

test('handles POSTS_FORCE_REFRESH', t => {
  const prevState = { [dummySub]: prevStateForSub };

  const newState = reducer(prevState, {
    type: ActionTypes.POSTS_FORCE_REFRESH,
    sr_display_name: dummySub
  });
  const actual = newState[dummySub];
  const expected = {
    isFetching: null,
    forceRefresh: true,
    items: null,
    lastUpdated: null,
    errorMessage: null
  }

  t.deepEqual(actual, expected);
});

test('handles POSTS_FETCHING', t => {
  const prevState = { [dummySub]: prevStateForSub };

  const newState = reducer(prevState, {
    type: ActionTypes.POSTS_FETCHING,
    sr_display_name: dummySub
  });
  const actual = newState[dummySub];
  const expected = {
    isFetching: true,
    forceRefresh: false,
    items: null,
    lastUpdated: null,
    errorMessage: null
  }

  t.deepEqual(actual, expected);
});

test('handles POSTS_SUCCESS', t => {
  const prevState = { [dummySub]: prevStateForSub };

  const newState = reducer(prevState, {
    type: ActionTypes.POSTS_SUCCESS,
    sr_display_name: dummySub,
    items: ['some', 'new', 'stuff'],
    receivedAt: 1
  });
  const actual = newState[dummySub];
  const expected = {
    isFetching: false,
    forceRefresh: false,
    items: ['some', 'new', 'stuff'],
    lastUpdated: 1,
    errorMessage: null
  }

  t.deepEqual(actual, expected);
});

test('handles POSTS_ERROR', t => {
  prevStateForSub.items = ['some', 'existing', 'items'];
  const prevState = { [dummySub]: prevStateForSub };

  const newState = reducer(prevState, {
    type: ActionTypes.POSTS_ERROR,
    sr_display_name: dummySub,
    receivedAt: 1,
    errorMessage: 'whoops'
  });
  const actual = newState[dummySub];
  const expected = {
    isFetching: false,
    forceRefresh: false,
    lastUpdated: 1,
    items: ['some', 'existing', 'items'],
    errorMessage: 'whoops'
  }

  t.deepEqual(actual, expected);
});

test('state is shaped by "sr_display_name" property of actions', t => {
  const names = ['alpha', 'bravo', 'charlie'];
  const currentState = names.reduce((state, key) => (
    reducer(state, {
      type: ActionTypes.POSTS_FORCE_REFRESH,
      sr_display_name: key
    })
  ), {});

  const actualKeys = Object.keys(currentState);
  const expectedKeys = ['alpha', 'bravo', 'charlie'];

  t.deepEqual(actualKeys, expectedKeys);
});
