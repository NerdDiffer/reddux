import test from 'ava';
import reduxThunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import requireSrc from '../../proxyPaths';

const ActionTypes = requireSrc('constants', 'actionTypes');
const { replaceFeedItems } = requireSrc('actions', 'feed');

const mockStore = configureMockStore([reduxThunk]);

test('dispatches when "isMultipleMode" is true', t => {
  const mockState = {
    feed: { isMultipleMode: true },
    lists: { feedQueue: ['sub1', 'sub3'] },
    posts: {
      sub1: { items: ['alpha', 'beta', 'charlie'] },
      sub2: { items: ['delta', 'echo', 'foxtrot'] },
      sub3: { items: ['golf', 'hotel', 'india'] }
    }
  };
  const flattened = ['alpha', 'beta', 'charlie', 'golf', 'hotel', 'india'];

  const store = mockStore(mockState);

  store.dispatch(replaceFeedItems())

  const actual = store.getActions();
  const expected = [
    { type: ActionTypes.LISTS_FEED_REPLACE_ALL, payload: flattened }
  ];

  t.deepEqual(actual, expected);
});

test('dispatches when "isMultipleMode" is false', t => {
  const mockState = {
    feed: {
      isMultipleMode: false,
      source: 'sub2'
    },
    posts: {
      sub1: { items: ['alpha', 'beta', 'charlie'] },
      sub2: { items: ['delta', 'echo', 'foxtrot'] },
      sub3: { items: ['golf', 'hotel', 'india'] }
    }
  };
  const store = mockStore(mockState);

  store.dispatch(replaceFeedItems())

  const actual = store.getActions();
  const expected = [
    { type: ActionTypes.LISTS_FEED_REPLACE_ALL, payload: ['delta', 'echo', 'foxtrot'] }
  ];

  t.deepEqual(actual, expected);
});
