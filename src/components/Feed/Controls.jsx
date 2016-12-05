import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Button, Form, Header } from 'semantic-ui-react';
import SelectSource from './SelectSource';
import * as postsActions from '../../state/actions/posts';
import { fetchBulk, replaceFeedItems } from '../../state/actions/feed';

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

  handleForceRefresh(e) {
    e.preventDefault();

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
      this.fetchThenRender(source);
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

    return (<Header as="h3">{content}</Header>)
  }

  render () {
    return (
      <Form className="feed controls">
        <Form.Group grouped>
          <SelectSource />
          <Form.Button content="Refresh Posts" onClick={this.handleForceRefresh} />
        </Form.Group>
        {this.renderHeader()}
      </Form>
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

const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...postsActions, fetchBulk, replaceFeedItems }, dispatch)
);

const ConnectedFeedControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedControls);

export default ConnectedFeedControls;
