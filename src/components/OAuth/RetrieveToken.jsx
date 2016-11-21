import React from 'react';
import { Button } from 'semantic-ui-react';

const RetrieveToken = ({ handleClick }) => (
  <Button
    content="Refresh token"
    onClick={handleClick}
  />
);

export default RetrieveToken;
