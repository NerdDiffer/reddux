import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Button, Form } from 'semantic-ui-react';
import SelectSubreddit from './SelectSubreddit';
import * as actions from '../../state/actions/posts';

class FeedControls extends Component {
  constructor(props) {
    super(props);

    this.handleFetchPosts = this.handleFetchPosts.bind(this);
    this.handleForceRefresh = this.handleForceRefresh.bind(this);
  }

  componentDidMount() {
    this.handleFetchPosts()
  }

  componentWillReceiveProps(nextProps) {
    const { selectedSub: nextSelectedSub } = nextProps;

    if (nextSelectedSub !== this.props.selectedSub) {
      return this.props.fetchPostsIfNeeded(nextSelectedSub);
    }
  }

  handleFetchPosts() {
    const { selectedSub } = this.props;
    return this.props.fetchPostsIfNeeded(selectedSub);
  }

  handleForceRefresh() {
    const { selectedSub } = this.props;
    this.props.forceRefresh(selectedSub);
    return this.props.fetchPostsIfNeeded(selectedSub);
  }

  render () {
    const { selectedSub } = this.props;

    return (
      <div className="feed controls">
        <Form.Group>
          <SelectSubreddit selectedSub={selectedSub} />
          <h3>{selectedSub}</h3>
        </Form.Group>
        <Form.Group>
          <Button content="Refresh Posts" onClick={this.handleForceRefresh} />
          <br />
          <Icon
            name="refresh"
            size="large"
            color="black"
            loading={this.props.isFetching}
          />
        </Form.Group>
      </div>
    );
  }
}

const mapStateToProps = ({ posts = {} }) => {
  const { selectedSub } = posts;

  const postsInSelectedSub = posts[selectedSub] || {
    isFetching: false,
    errorMessage: null
  };

  const {
    isFetching,
    errorMessage,
    lastUpdated
  } = postsInSelectedSub;

  return {
    selectedSub,
    isFetching,
    errorMessage,
    lastUpdated
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

const ConnectedFeedControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedControls);

export default ConnectedFeedControls;
