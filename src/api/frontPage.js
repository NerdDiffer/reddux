// get the front page
import { setAuthorizationHeader } from './config';

export default client => {
  const url = 'https://oauth.reddit.com/.json';
  const headers = setAuthorizationHeader();

  return client.get(url, { headers })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);

      if (err.response) {
        const { status, headers, data } = err.response;
        console.log(status);
        console.log(headers);
        console.log(data);
      } else {
        console.log(err.message);
      }

      console.log(err.config);
    });
};
