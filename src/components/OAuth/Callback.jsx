import React, { Component } from 'react';
import { stringify } from 'querystring';
import apiClient, {
  accessToken
} from '../../api';

class OAuthCallback extends Component {
  componentDidMount() {
    const code = this.props.location.query.code;
    accessToken.retrieve(apiClient, code);
  }

  render() {
    return(
      <div className="clientTest">
      </div>
    );
  }
}

export default OAuthCallback;
