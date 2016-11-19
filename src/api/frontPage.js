// get the front page
import { generateBearerHeader, showError } from './_shared';

export default () => {
  const url = 'https://oauth.reddit.com/.json';
  const config = {
    headers: generateBearerHeader()
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
