// get the front page
import { generateBearerHeader, showError } from './_shared';

export default client => {
  const url = 'https://oauth.reddit.com/.json';
  const headers = generateBearerHeader();

  return client.get(url, { headers })
    .then(res => {
      return res;
    })
    .catch(err => {
      showError(err)
    });
};
