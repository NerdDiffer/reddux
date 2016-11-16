import React, { Component } from 'react';
import { authUrl } from '../../api/config';

const Authorize = () => (
  <div className="auth link">
    <a href={authUrl}>Authorize Reddit</a>
  </div>
);

export default Authorize;
