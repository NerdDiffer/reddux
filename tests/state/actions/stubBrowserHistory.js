import test from 'ava';
import * as router from 'react-router';

/**
 * react.browserHistory is undefined outside of browser environment, sinon
 * won't let you stub it. So, doing it manually.
 *
 * To use this module, import it for side-effects, ie: `import 'path/to/module'`
 *
 * Putting this property on 'react-router' will let you define its behavior
 * inside a test with sinon. If you do this, be sure to import react router in
 * this fashion: `import * as router from 'react-router'`
 *
 * original idea from: http://stackoverflow.com/a/38417873/2908123
 */

const originalBrowserHistory = router.browserHistory;

test.beforeEach(t => {
  router.browserHistory = { push: () => {} };
});

test.afterEach(t => {
  router.browserHistory = originalBrowserHistory;
});
