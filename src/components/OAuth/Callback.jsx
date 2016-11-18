import React, { Component } from 'react';
import { stringify } from 'querystring';
import { accessToken } from '../../api';
import { accessTokenStorage, refreshTokenStorage } from '../../utils/storage';

class OAuthCallback extends Component {
  componentDidMount() {
    const code = this.props.location.query.code;

    accessToken.retrieve(code)
      .then(data => {
        console.log(data);
        accessTokenStorage.set(data.access_token);
        refreshTokenStorage.set(data.refresh_token);
      });
  }

  render() {
    return(
      <div className="clientTest">
      </div>
    );
  }
}

export default OAuthCallback;
