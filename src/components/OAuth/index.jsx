import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions/auth';
import AuthUrl from './AuthUrl';
import RetrieveToken from './RetrieveToken';

class OAuthPanel extends Component {
  constructor(props) {
    super(props);

    this.handleRequestRefreshToken = this.handleRequestRefreshToken.bind(this);
  }

  handleRequestRefreshToken() {
    this.props.handleRequestRefreshToken();
  }

  handleRevokeTokens() {
    // TODO: add handler & UI for manually revoking tokens
  }

  renderLink() {
    const { hasToken, isFetching } = this.props;

    if (!hasToken) {
      return (<AuthUrl />);
    } else {
      return (
        <RetrieveToken
          handleClick={this.handleRequestRefreshToken}
          loading={isFetching}
        />
      );
    }
  }

  render() {
    const { hasToken } = this.props;

    return (
      <div className="auth link">
        {this.renderLink()}
      </div>
    );
  }
};

const mapStateToProps = ({ auth }) => ({
  hasToken: auth.hasToken,
  isFetching: auth.isFetching
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions }, dispatch)
);

const ConnectedOAuthPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(OAuthPanel);

export default ConnectedOAuthPanel;
