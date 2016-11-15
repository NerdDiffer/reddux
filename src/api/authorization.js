import axios from 'axios';

const authorize = client => {
  const url = '/api/v1/authorize';
  const params = {
    client_id: process.env.REDDIT_CLIENT_ID,
    response_type: 'code',
    state: 'RANDOM_STRING',
    redirect_uri: 'http://localhost:8080/oauth/callback',
    duration: 'temporary',
    scope: 'identity mysubreddits read'
  };

  return client.get(url, { ...params })
  //  .then(res => {
  //    console.log(res);
  //  })
  //  .catch(err => {
  //    console.log(err);

  //    if (err.response) {
  //      const { status, headers, data } = err.response;
  //      console.log(status);
  //      console.log(headers);
  //      console.log(data);
  //    } else {
  //      console.log(err.message);
  //    }
  //  });
};

export default authorize;
