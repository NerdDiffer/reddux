import React from 'react';
import { Button } from 'semantic-ui-react';
import { authUrl } from '../../api';

const AuthUrl = () => (
  <a href={authUrl}>
    <Button
      icon="sign in"
      content="Authorize Reddit Account"
    />
  </a>
);

export default AuthUrl;
