import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { authUrl, accessToken } from '../../api';
import { accessTokenStorage, refreshTokenStorage } from '../../utils/storage';

const refresh = () => {
  const token = refreshTokenStorage.get();
  return accessToken.refresh(token)
    .then(data => {
      console.log(data);
      accessTokenStorage.set(data.access_token);
      refreshTokenStorage.clear();
    });
};

const Authorize = () => (
  <div className="auth link">
    <a href={authUrl}>Authorize Reddit</a>
    <br />
    <Button content="Refresh token" onClick={refresh} />
  </div>
);

export default Authorize;
