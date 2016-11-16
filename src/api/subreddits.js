// Get the user subreddits
import { setAuthorizationHeader, showError } from './_shared';

const getSubreddits = (url, client) => {
  const headers = setAuthorizationHeader();

  return client.get(url, { headers })
    .then(res => {
      console.log(res);
      return res.data.data;
    })
    .catch(err => {
      showError(err);
    });
};

export const getMySubreddits = getSubreddits.bind(null, '/subreddits/mine/subscriber');
export const getPopularSubreddits = getSubreddits.bind(null, '/subreddits/popular');
