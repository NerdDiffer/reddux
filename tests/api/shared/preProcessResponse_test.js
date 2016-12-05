import test from 'ava';
import mockFetch from 'fetch-mock';
import { preProcessResponse } from '../../../src/api/_shared';
import { isObject } from '../../assertions';

test.before(t => {
  mockFetch.get(/fulfilled/, {
    body: { message: 'response body' },
    'status': 200,
    headers: 'headers'
  });

  mockFetch.get(/rejected/, {
    body: 'error message',
    'status': 404,
    statusText: 'Not Found'
  });
});

test.after(t => {
  mockFetch.restore();
});

test('handles success', t => {
  t.plan(1);

  return fetch('fulfilled')
    .then(res => preProcessResponse(res))
    .then(json => t.true(isObject(json)));
});

test('handles errors', t => {
  t.plan(2);

  return fetch('rejected')
    .then(res => preProcessResponse(res))
    .catch(err => {
      t.is(typeof err, 'object');
      t.is(err.toString(), 'Error: Not Found');
    });
});
