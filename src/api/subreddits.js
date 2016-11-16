// Get the user subreddits
import { setAuthorizationHeader, showError } from './_shared';

export const getMySubreddits = client => {
  const url = '/subreddits/mine/subscriber';
  const headers = setAuthorizationHeader();

  return client.get(url, { headers })
    .then(res => {
      return res;
    })
    .catch(err => {
      showError(err);
    });
};

// TODO: send request for url: '/subreddits/popular'
