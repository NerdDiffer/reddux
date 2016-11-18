/* global window */

// helpers for local storage

const createStorageManager = KEY => ({
  get: () => window.localStorage.getItem(KEY),
  set: token => window.localStorage.setItem(KEY, token),
  clear: () => window.localStorage.removeItem(KEY)
});

const accessTokenStorage = createStorageManager('access_token');
const refreshTokenStorage = createStorageManager('refresh_token');

export {
  accessTokenStorage,
  refreshTokenStorage
};
