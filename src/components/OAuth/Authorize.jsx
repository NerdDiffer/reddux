import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { authUrl, accessToken } from '../../api';
import { accessTokenStorage, refreshTokenStorage } from '../../utils/storage';

class Authorize extends Component {
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
      return (<a href={authUrl}>Authorize Reddit</a>);
    } else {
      return (
        <Button
          content="Refresh token"
          onClick={this.handleRequestRefreshToken}
        />
      );
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

export default Authorize;
