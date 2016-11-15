export const setAuthorizationHeader = () => {
  const { REDDIT_CLIENT_ID, REDDIT_SECRET, REDDIT_ACCESS_TOKEN } = process.env;
  const authValue = `Bearer ${REDDIT_ACCESS_TOKEN}`;
  return { 'Authorization': authValue };
};
