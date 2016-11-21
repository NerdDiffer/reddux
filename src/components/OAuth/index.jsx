import React, { Component } from 'react';
import { accessToken } from '../../api';
import { accessTokenStorage, refreshTokenStorage } from '../../utils/storage';
import AuthUrl from './AuthUrl';
import RetrieveToken from './RetrieveToken';

class OAuthPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasAccessToken: !!accessTokenStorage.get(),
      hasRefreshToken: !!refreshTokenStorage.get()
    };

    this.handleRequestRefreshToken = this.handleRequestRefreshToken.bind(this);
  }

  handleRequestRefreshToken() {
    const token = refreshTokenStorage.get();

    return accessToken.refresh(token)
      .then(data => {
        console.log(data);
        accessTokenStorage.set(data.access_token);
        refreshTokenStorage.clear();
      })
      .then(() => {
        this.setState({
          hasAccessToken: true,
          hasRefreshToken: false
        });
      })
  }

  handleRevokeTokens() {
    // TODO: add handler & UI for manually revoking tokens
  }

  renderLink() {
    const { hasAccessToken, hasRefreshToken } = this.state;

    if (!hasAccessToken || !hasRefreshToken) {
      return (<AuthUrl />);
    } else {
      return (<RetrieveToken handleClick={this.handleRequestRefreshToken} />);
    }
  }

  render() {
    const { hasAccessToken, hasRefreshToken } = this.state;

    return (
      <div className="auth link">
        {this.renderLink()}
      </div>
    );
  }
};

export default OAuthPanel;
