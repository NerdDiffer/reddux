import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';

const RevokeTokens = ({ handleClick, loading }) => (
  <Button
    icon="sign out"
    content="Revoke token"
    loading={loading}
    onClick={handleClick}
  />
);

RevokeTokens.propTypes = {
  handleClick: PropTypes.func,
  loading: PropTypes.bool
};

export default RevokeTokens;
