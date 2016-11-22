import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleAuthCallback } from '../../state/actions/auth';

class AuthCallback extends Component {
  componentDidMount() {
    const { error, code } = this.props.location.query;
    return this.props.handleAuthCallback({ error, code });
  }

  render() {
    return (<div className="auth callback" />);
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ handleAuthCallback }, dispatch)
);

const ConnectedCallback = connect(
  null,
  mapDispatchToProps
)(AuthCallback);

export default ConnectedCallback;
