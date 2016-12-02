/**
 * These exist to make paths to source modules for individual tests easier on
 * the eyes. Seeing (../../../../less/dots/please) everywhere is a pain.
 *
 * You must use "require" instead of "import" when referencing the modules.
 * This helper merely provides the string path to the module.
 * Static analysis is a goal of "import"ing modules, so it doesn't make sense
 * to use it when you want to dynamically-load something. Use "require" instead.
 *
 * Alternatively, you can use the loading function (the default export), which
 * wraps up require for you.
 */

const path = require('path');
const ROOT = path.join(__dirname, '../../src/state/');

const constants = {
  actionTypes: ROOT + 'constants/actionTypes',
  index:       ROOT + 'constants'
};

const actions = {
  auth:          ROOT + 'actions/auth',
  feed:          ROOT + 'actions/feed',
  posts:         ROOT + 'actions/posts',
  subreddits:    ROOT + 'actions/subreddits',
  subscriptions: ROOT + 'actions/subscriptions'
};

const reducers = {
  auth:       ROOT + 'reducers/auth',
  feed:       ROOT + 'reducers/feed',
  lists:      ROOT + 'reducers/lists',
  messages:   ROOT + 'reducers/messages',
  posts:      ROOT + 'reducers/posts',
  subreddits: ROOT + 'reducers/subreddits'
};

export const modules = {
  constants,
  actions,
  reducers
};

export default (moduleType, moduleName) => {
  const pathToModule = modules[moduleType][moduleName];
  const requiredModule = require(pathToModule);
  return requiredModule;
};
