import test from 'ava';
import requireSrc from '../proxyPaths';

const ActionTypes = requireSrc('constants', 'actionTypes');
const reducer = requireSrc('reducers', 'messages').default;

let prevState;

test.beforeEach(t => {
  prevState = {
    format: null,
    message: {
      header: null,
      listItems: null,
      content: null
    }
  };
});

test('returns some default state', t => {
  const actual = reducer(undefined, { type: '' });
  const expected = {};
  t.deepEqual(actual, expected);
});

// Don't re-order the following items
const { MSG_SUCCESS, MSG_ERROR, MSG_INFO, MSG_WARNING } = ActionTypes;
const actionTypes = [MSG_SUCCESS, MSG_ERROR, MSG_INFO, MSG_WARNING];
const payloads = ['Something good happened', 'Something went wrong', 'Something happened', 'Something bad might happen'];
const expectedFormats = ['success', 'error', 'info', 'warning'];

actionTypes.forEach((type, ind) => {
  const action = { type, payload: payloads[ind] };

  testSimple(action, expectedFormats[ind]);
});

actionTypes.forEach((type, ind) => {
  const payload = {
    header: 'header stuff',
    listItems: ['list', 'items'],
    content: payloads[ind]
  };
  const action = { type, payload };

  testComplex(action, expectedFormats[ind]);
});

/* Wrapped assertions */

function testSimple (action, expectedFormat) {
  test(`handles ${action.type} with simple payload`, t => {
    const actual = reducer(prevState, action);

    const expected = {
      format: expectedFormat,
      message: {
        header: null,
        listItems: null,
        content: action.payload
      }
    };

    t.deepEqual(actual, expected);
  });
}

function testComplex (action, expectedFormat) {
  test(`handles ${action.type} with complex payload`, t => {
    const actual = reducer(prevState, action);
    const expected = {
      format: expectedFormat,
      message: { ...action.payload }
    };

    t.deepEqual(actual, expected);
  });
}
