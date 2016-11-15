// Get the user subreddits
import { setAuthorizationHeader } from './config';

export default client => {
  const url = '/subreddits/mine/subscriber';
  const headers = setAuthorizationHeader();

  return client.get(url, { headers })
    .then(res => {
      console.log(res);
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
