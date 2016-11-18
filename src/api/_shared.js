export const generateBearerHeader = () => {
  const { REDDIT_ACCESS_TOKEN } = process.env;
  const authValue = `Bearer ${REDDIT_ACCESS_TOKEN}`;
  return { 'Authorization': authValue };
};

export const generateBasicHeader = (username, password) => {
  const str = `${username}:${password}`;
  const encoded = window.btoa(str); // base-64 encoding
  const authValue = `Basic ${encoded}`;
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
