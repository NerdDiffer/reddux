import { buildAuthorizationHeader, stringifyData, preProcessResponse, redirect_uri } from './_shared';

const buildPostReqConfig = params => ({
  method: 'POST',
  body: stringifyData(params),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': buildAuthorizationHeader('basic')
  },
  cache: 'no-cache'
});

const postForToken = params => {
  const url = 'https://www.reddit.com/api/v1/access_token';
  const config = buildPostReqConfig(params);
  return fetch(url, config)
    .then(res => preProcessResponse(res));
};

// https://github.com/reddit/reddit/wiki/OAuth2#retrieving-the-access-token
export const postForAccessToken = code => {
  const params = {
    grant_type: 'authorization_code',
    code,
    redirect_uri
  };

  return postForToken.call(null, params);
};

// https://github.com/reddit/reddit/wiki/OAuth2#refreshing-the-token
export const postForRefreshToken = refresh_token => {
  const params = {
    grant_type: 'refresh_token',
    refresh_token
  };

  return postForToken.call(null, params);
};

// https://github.com/reddit/reddit/wiki/OAuth2#manually-revoking-a-token
export const postToRevokeToken = ({ token, tokenType }) => {
  const url = 'https://www.reddit.com/api/v1/revoke_token';
  const params = {
    token,
    token_type_hint: tokenType
  };
  const config = buildPostReqConfig(params);

  return fetch(url, config)
    .then(res => res); // just returns a 204 status code, even if token was never valid.
};
