// Get the user subreddits

export default client => {
  const url = '/subreddits/mine/subscriber';
  const { REDDIT_CLIENT_ID, REDDIT_SECRET, REDDIT_ACCESS_TOKEN } = process.env;
  console.log({ REDDIT_CLIENT_ID, REDDIT_SECRET, REDDIT_ACCESS_TOKEN });

  const authValue = `Bearer ${REDDIT_ACCESS_TOKEN}`;
  // TODO: remove this & refresh your access token if the process.env reference
  // starts showing up!
  const authValue_hardcoded = 'Bearer PuAtJ7CoKm4RsFiZ_6SWe04vJ7E';

  const headers = { 'Authorization': authValue_hardcoded };

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
