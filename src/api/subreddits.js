// Get the user subreddits
import { generateBearerHeader, showError } from './_shared';

const getSubreddits = (url, client) => {
  const headers = generateBearerHeader();

  return client.get(url, { headers })
    .then(res => {
      // console.log(res);
      return res.data.data;
    })
    .catch(err => {
      showError(err);
      return err;
    });
};

export const getMySubreddits = getSubreddits.bind(null, '/subreddits/mine/subscriber');
export const getPopularSubreddits = getSubreddits.bind(null, '/subreddits/popular');

export const postToSubscription = (client, params) => {
  const url = '/api/subscribe';

  const headers = generateBearerHeader();
  headers['Content-Type'] = 'application/x-www-form-urlencoded';

  return client.post(url, params, { headers })
    .then(res => {
      console.log(res);
      return res.data.data;
    })
    .catch(err => {
      showError(err);
    });
};
