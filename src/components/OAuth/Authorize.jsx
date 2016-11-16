import React, { Component } from 'react';
import { buildAuthUrl } from '../../api';

class Authorize extends Component {
  componentWillMount() {
    console.log(buildAuthUrl());
  }

  render() {
    return(
      <div className="auth link">
        <a href={buildAuthUrl()}>Authorize Reddit</a>
      </div>
    );
  }
}

export default Authorize;
