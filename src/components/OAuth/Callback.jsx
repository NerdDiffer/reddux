import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleAuthorization } from '../../state/actions/auth';

class OAuthCallback extends Component {
  componentDidMount() {
    const { error, code } = this.props.location.query;
    return this.props.handleAuthorization({ error, code });
  }

  render() {
    return(
      <div className="clientTest">
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ handleAuthorization }, dispatch)
);

const ConnectedCallback = connect(
  mapStateToProps,
  mapDispatchToProps
)(OAuthCallback);

export default ConnectedCallback;
