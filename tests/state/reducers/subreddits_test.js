import test from 'ava';
import requireSrc from '../proxyPaths';
import { isObject } from '../../assertions';

const ActionTypes = requireSrc('constants', 'actionTypes');
const reducer = requireSrc('reducers', 'subreddits').default;

let prevState;

test.beforeEach(t => {
  prevState = {
    isFetching: null, // boolean
    nameOfCollectionToShow: null, // string
    collectionToShow: null, // array
    allSubs: null // object
  };
});

test('returns some default state', t => {
  const actual = reducer(undefined, { type: '' });
  const expected = {};
  t.deepEqual(actual, expected);
});

test('handles SR_RECEIVE', t => {
  const actual = reducer(prevState, {
    type: ActionTypes.SR_RECEIVE,
    payload: { foo: 'foo', bar: 'bar' }
  });
  const expected = {
    isFetching: null,
    nameOfCollectionToShow: null,
    collectionToShow: null,
    allSubs: { foo: 'foo', bar: 'bar' }
  };
  t.deepEqual(actual, expected);
});

test('handles SR_COLLECTION_TO_SHOW', t => {
  const actual = reducer(prevState, {
    type: ActionTypes.SR_COLLECTION_TO_SHOW,
    payload: ['foo', 'bar']
  });
  const expected = {
    isFetching: null,
    nameOfCollectionToShow: null,
    collectionToShow: ['foo', 'bar'],
    allSubs: null
  };
  t.deepEqual(actual, expected);
});

test('handles SR_NAME_TO_SHOW', t => {
  const actual = reducer(prevState, {
    type: ActionTypes.SR_NAME_TO_SHOW,
    payload: 'foo',
  });
  const expected = {
    isFetching: null,
    nameOfCollectionToShow: 'foo',
    collectionToShow: null,
    allSubs: null
  };
  t.deepEqual(actual, expected);
});

test('handles SR_IS_FETCHING', t => {
  const actual = reducer(prevState, { type: ActionTypes.SR_IS_FETCHING });
  const expected = {
    isFetching: true,
    nameOfCollectionToShow: null,
    collectionToShow: null,
    allSubs: null
  };
  t.deepEqual(actual, expected);
});

test('handles SR_IS_NOT_FETCHING', t => {
  const actual = reducer(prevState, { type: ActionTypes.SR_IS_NOT_FETCHING });
  const expected = {
    isFetching: false,
    nameOfCollectionToShow: null,
    collectionToShow: null,
    allSubs: null
  };
  t.deepEqual(actual, expected);
});
