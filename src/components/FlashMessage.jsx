import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

class FlashMessage extends Component {
  constructor(props) {
    super(props);

    this.state = { isVisible: !!this.props.message };
    this.hideMessage = this.hideMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const willHaveMessage = !!nextProps.message;

    if (willHaveMessage) {
      this.setState({ isVisible: true });
    }
  }

  hideMessage() {
    this.setState({ isVisible: false });
  }

  render() {
    const { isVisible } = this.state;

    if (!isVisible) {
      return null;
    } else {
      const { format, message } = this.props;

      return (
        <Message
          onDismiss={this.hideMessage}
          info={format === 'info'}
          error={format === 'error'}
          warning={format === 'warning'}
          success={format === 'success'}
          content={message}
        />
      );
    }
  }
};

const mapStateToProps = ({ messages }) => ({ ...messages })

const ConnectedFlashMessage = connect(
  mapStateToProps
)(FlashMessage);

export default ConnectedFlashMessage;
