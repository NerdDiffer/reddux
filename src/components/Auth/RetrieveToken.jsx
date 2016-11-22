import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';

const RetrieveToken = ({ handleClick, loading }) => (
  <Button
    content="Refresh token"
    loading={loading}
    onClick={handleClick}
  />
);

RetrieveToken.propTypes = {
  handleClick: PropTypes.func,
  loading: PropTypes.bool
};

export default RetrieveToken;
