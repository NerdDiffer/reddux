import { accessTokenStorage } from '../utils/storage';

export const generateBearerHeader = () => {
  const token = accessTokenStorage.get();
  const authValue = `Bearer ${token}`;
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
