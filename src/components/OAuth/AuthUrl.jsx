import React from 'react';
import { authUrl } from '../../api';

const AuthUrl = () => (
  <a href={authUrl}>Authorize Reddit Account</a>
);

export default AuthUrl;
