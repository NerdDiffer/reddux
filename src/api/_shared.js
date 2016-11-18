export const generateBearerHeader = () => {
  const { REDDIT_ACCESS_TOKEN } = process.env;
  const authValue = `Bearer ${REDDIT_ACCESS_TOKEN}`;
  return { 'Authorization': authValue };
};

export const showError = err => {
  console.log(err);
  console.log(err.config);

  if (!err.response) {
    console.log(err.message);
  } else {
    const { status, headers, data } = err.response;
    console.log(status);
    console.log(headers);
    console.log(data);
  }
};
