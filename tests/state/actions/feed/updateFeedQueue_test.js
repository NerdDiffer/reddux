import test from 'ava';
import reduxThunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import requireSrc from '../../proxyPaths';

const ActionTypes = requireSrc('constants', 'actionTypes');
const { updateFeedQueue } = requireSrc('actions', 'feed');

const mockStore = configureMockStore([reduxThunk]);

test('dispatches', t => {
  const mockState = {}
  const store = mockStore(mockState);

  const feedQueue = ['curly', 'larry', 'moe'];
  store.dispatch(updateFeedQueue(feedQueue));

  const actual = store.getActions();
  const expected = [
    { type: ActionTypes.LISTS_FEED_QUEUE, payload: feedQueue }
  ];

  t.deepEqual(actual, expected);
});
