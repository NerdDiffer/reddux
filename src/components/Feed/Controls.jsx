import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Button, Form } from 'semantic-ui-react';
import SelectSource from './SelectSource';
import * as actions from '../../state/actions/posts';

class FeedControls extends Component {
  constructor(props) {
    super(props);

    const { isMultipleMode, source } = this.props;

    if (!isMultipleMode && source) {
      this.fetchThenRender(source);
    }

    this.handleForceRefresh = this.handleForceRefresh.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { source: nextSource, isMultipleMode: willBeMultipleMode } = nextProps;

    if (!willBeMultipleMode && nextSource !== this.props.source) {
      this.fetchThenRender(nextSource);
    }
    // TODO: add conditions to detect change when in multiple mode (source is array)
  }

  fetchThenRender(source) {
    return this.props.fetchPostsIfNeeded(source)
      .then(() => this.props.replaceFeedItems());
  }

  handleForceRefresh() {
    const { isMultipleMode } = this.props;

    if (isMultipleMode) {
      const { feedQueue } = this.props;

      const promises = feedQueue.map(sr_name => this.props.forceRefresh(sr_name));

      Promise.all(promises)
        .then(results => {
          return this.props.fetchBulk();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const { source } = this.props;
      this.props.forceRefresh(source);
      return this.props.fetchAndRender(source);
    }
  }

  renderHeader() {
    const { source, isMultipleMode } = this.props;

    let content;

    if (isMultipleMode) {
      content = source.join(', ');
    } else {
      content = source;
    }

    return (<h3>{content}</h3>)
  }

  render () {
    return (
      <div className="feed controls">
        <Form.Group>
          <SelectSource />
          {this.renderHeader()}
        </Form.Group>
        <Form.Group>
          <Button content="Refresh Posts" onClick={this.handleForceRefresh} />
          <br />
          <Icon
            name="refresh"
            size="large"
            color="black"
          />
        </Form.Group>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, feed, lists }) => {
  const { source, isMultipleMode } = feed;
  const { feedQueue } = lists;

  return {
    source,
    // isFetching, TODO: figure out how to do `isFetching` for multiple sources
    isMultipleMode,
    feedQueue
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

const ConnectedFeedControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedControls);

export default ConnectedFeedControls;
