import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loader, Dimmer, Segment } from 'semantic-ui-react';
import { handleAuthCallback } from '../../state/actions/auth';

class AuthCallback extends Component {
  componentDidMount() {
    const { error, code } = this.props.location.query;
    return this.props.handleAuthCallback({ error, code });
  }

  render() {
    if (!this.props.isPrefetching) {
      return (<div className="auth callback" />);
    } else {
      return (
        <Segment id="prefetching">
          <Dimmer active>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
        </Segment>
      );
    }
  }
}

const mapStateToProps = ({ auth }) => ({ isPrefetching: auth.isPrefetching });
const mapDispatchToProps = dispatch => (
  bindActionCreators({ handleAuthCallback }, dispatch)
);

const ConnectedCallback = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthCallback);

export default ConnectedCallback;
