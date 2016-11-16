// get the front page
import { setAuthorizationHeader, showError } from './_shared';

export default client => {
  const url = 'https://oauth.reddit.com/.json';
  const headers = setAuthorizationHeader();

  return client.get(url, { headers })
    .then(res => {
      return res;
    })
    .catch(err => {
      showError(err)
    });
};
