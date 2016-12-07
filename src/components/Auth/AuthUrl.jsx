import React from 'react';
import { Button } from 'semantic-ui-react';
import { authUrl } from '../../api';

const AuthUrl = ({ color, content = 'Authorize Account' }) => (
  <a href={authUrl}>
    <Button
      icon="sign in"
      content={content}
      color={color}
    />
  </a>
);

export default AuthUrl;
