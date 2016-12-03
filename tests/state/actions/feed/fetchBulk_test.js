import test from 'ava';
import reduxThunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import requireSrc from '../../proxyPaths';

const ActionTypes = requireSrc('constants', 'actionTypes');
const { fetchBulk } = requireSrc('actions', 'feed');

const mockStore = configureMockStore([reduxThunk]);

// TODO: need to mock the fetch call. Write tests for 'posts.fetchPostsIfNeeded'
// first. Then come back to this. Consider the package "redux-actions-assertions",
// which is supposed to help you avoid testing nested actions creators.
test.skip('fetches & dispatches action each item in feedQueue', t => {
  const mockState = {
    feed: { isMultipleMode: true },
    lists: { feedQueue: ['sub1', 'sub3'] },
    posts: {
      sub1: { items: ['alpha', 'beta', 'charlie'] },
      sub2: { items: ['delta', 'echo', 'foxtrot'] },
      sub3: { items: ['golf', 'hotel', 'india'] }
    }
  };
});
