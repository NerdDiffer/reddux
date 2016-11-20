// get the front page
import { buildAuthorizationHeader, showError } from './_shared';

export const getFrontPage = () => {
  const url = 'https://oauth.reddit.com/.json';
  const config = {
    headers: {
      'Authorization': buildAuthorizationHeader('bearer')
    }
  };

  return fetch(url, config)
    .then(res => {
      console.log(res);
      return res.json();
    })
    .catch(err => {
      showError(err)
    });
};
