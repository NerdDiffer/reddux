import test from 'ava';
import { isObject } from '../assertions';
import requireSrc, { modules } from '../state/proxyPaths';

test('requireSrc, throws error with bad input', t => {
  t.throws(() => requireSrc('invalid_moduleType'), Error);
  t.throws(() => requireSrc('invalid_moduleType', 'invalid_moduleName'), Error);
});

test('modules, wraps up these sub-modules', t => {
  const actual = Object.keys(modules).sort();
  const expected = ['actions', 'constants', 'reducers'].sort();
  t.deepEqual(actual, expected);
});

for (const moduleName in modules) {
  const moduleObj = modules[moduleName];

  testShape(moduleObj, moduleName);
  testValues(moduleObj, moduleName);
  testRequire(moduleObj, moduleName);
}

/* Wrapped assertions */

function testShape (moduleObj, moduleName) {
  test(`${moduleName}, is an object`, t => {
    const actual = isObject(moduleObj);
    t.true(actual);
  });
}

function testValues (moduleObj, moduleName) {
  test(`${moduleName}, each value in paths object is a string`, t => {
    const keys = Object.keys(moduleObj);
    t.plan(keys.length);
    keys.forEach(key => t.is(typeof moduleObj[key], 'string'));
  });
}

function testRequire (moduleObj, moduleName) {
  test(`${moduleName}, can use each path with "require" to load sub-module`, t => {
    const keys = Object.keys(moduleObj);
    t.plan(keys.length);

    keys.forEach(key => {
      const pathToModule = moduleObj[key];
      const requiredModule = require(pathToModule);
      t.true(isObject(requiredModule));
    });
  });
}
