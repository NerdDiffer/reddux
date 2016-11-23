import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Header } from 'semantic-ui-react';
import * as actions from '../../state/actions/auth';
import AuthUrl from './AuthUrl';
import RetrieveToken from './RetrieveToken';
import RevokeTokens from './RevokeTokens';

class AuthPanel extends Component {
  constructor(props) {
    super(props);

    this.handleRequestRefreshToken = this.handleRequestRefreshToken.bind(this);
    this.handleRevokeTokens = this.handleRevokeTokens.bind(this);
  }

  handleRequestRefreshToken() {
    this.props.handleRequestRefreshToken();
  }

  handleRevokeTokens() {
    this.props.handleRevokeTokens();
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

  renderRevokeTokens() {
    const { hasToken, isRevoking } = this.props;

    if (!hasToken) {
      return null;
    } else {
      return (
        <RevokeTokens
          handleClick={this.handleRevokeTokens}
          loading={isRevoking}
        />
      );
    }
  }

  render() {
    const { hasToken } = this.props;

    return (
      <div className="auth link">
        <Header as="h2" icon>
          Authentication Panel
          <Icon name="protect" />
        </Header>
        <br />
        {this.renderLink()}
        {this.renderRevokeTokens()}
      </div>
    );
  }
};

const mapStateToProps = ({ auth }) => ({
  hasToken: auth.hasToken,
  isFetching: auth.isFetching,
  isRevoking: auth.isRevoking
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions }, dispatch)
);

const ConnectedAuthPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPanel);

export default ConnectedAuthPanel;
