import test from 'ava';
import sinon from 'sinon';
import reduxThunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import '../stubBrowserHistory';
import requireSrc from '../../proxyPaths';
import { accessTokenStorage, refreshTokenStorage } from '../../../../src/utils/storage';

const ActionTypes = requireSrc('constants', 'actionTypes');
const { handleAuthCallback } = requireSrc('actions', 'auth');

const mockStore = configureMockStore([reduxThunk]);

let stubbed_accessTokenStorage;
let stubbed_refreshTokenStorage;

test.afterEach(t => {
  stubbed_accessTokenStorage.restore();
  stubbed_refreshTokenStorage.restore();
});

test('handles authentication failure when user denies access', t => {
  const truthy = () => 'truthy';
  stubbed_accessTokenStorage = sinon.stub(accessTokenStorage, 'clear', () => {});
  stubbed_refreshTokenStorage = sinon.stub(refreshTokenStorage, 'clear', () => {});
  const store = mockStore({});

  const queryParamsObj = { error: 'access_denied' };
  store.dispatch(handleAuthCallback(queryParamsObj));

  const actual = store.getActions();
  const expected = [
    { type: ActionTypes.AUTH_HAS_NO_TOKEN },
    { type: ActionTypes.AUTH_DENIAL },
    { type: ActionTypes.MSG_INFO, payload: 'You have denied access' }
  ];

  t.deepEqual(actual, expected);
});
