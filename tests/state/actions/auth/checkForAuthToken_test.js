import test from 'ava';
import sinon from 'sinon';
import reduxThunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import requireSrc from '../../proxyPaths';
import { accessTokenStorage } from '../../../../src/utils/storage';

const ActionTypes = requireSrc('constants', 'actionTypes');
const { checkForAuthToken } = requireSrc('actions', 'auth');

const mockStore = configureMockStore([reduxThunk]);

let stubbed_accessTokenStorage;

test.afterEach(t => stubbed_accessTokenStorage.restore());

test('dispatches "AUTH_HAS_TOKEN" when an access token is present', t => {
  const truthy = () => 'truthy';
  stubbed_accessTokenStorage = sinon.stub(accessTokenStorage, 'get', truthy);
  const store = mockStore({});

  store.dispatch(checkForAuthToken());
  const actual = store.getActions();
  const expected = [
    { type: ActionTypes.AUTH_HAS_TOKEN }
  ];

  t.deepEqual(actual, expected);
});

test('dispatches "AUTH_HAS_NO_TOKEN" when an access token is *not* present', t => {
  const falsey = () => null;
  stubbed_accessTokenStorage = sinon.stub(accessTokenStorage, 'get', falsey);
  const store = mockStore({});

  store.dispatch(checkForAuthToken());
  const actual = store.getActions();
  const expected = [
    { type: ActionTypes.AUTH_HAS_NO_TOKEN }
  ];

  t.deepEqual(actual, expected);
});
