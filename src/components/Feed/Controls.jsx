import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Button, Form } from 'semantic-ui-react';
import SelectSubreddit from './SelectSubreddit';
import * as actions from '../../state/actions/posts';
import { handleGetMySubreddits } from '../../state/actions/subreddits';

class FeedControls extends Component {
  constructor(props) {
    super(props);

    this.handleSelectSub = this.handleSelectSub.bind(this);
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

  handleSelectSub(sr_display_name) {
    return this.props.selectSubreddit(sr_display_name);
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
    const { mySubs, selectedSub, selectSubreddit } = this.props;

    return (
      <div className="feed controls">
        <Form.Group>
          <SelectSubreddit
            mySubs={mySubs}
            selectedSub={selectedSub}
            selectSubreddit={selectSubreddit}
          />
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

const mapStateToProps = ({ posts = {}, subreddits }) => {
  const { selectedSub } = posts;
  const { subscribedTo: mySubs } = subreddits;

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
    lastUpdated,
    mySubs
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions,
  handleGetMySubreddits
}, dispatch);

const ConnectedFeedControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedControls);

export default ConnectedFeedControls;
