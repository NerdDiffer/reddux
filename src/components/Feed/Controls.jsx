import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Button, Form } from 'semantic-ui-react';
import SelectSubreddit from './SelectSubreddit';
import * as actions from '../../state/actions/posts';
import { handleGetMySubreddits } from '../../state/actions/subreddits';
import { FRONT_PAGE } from '../../state/constants';

class FeedControls extends Component {
  constructor(props) {
    super(props);

    this.handleSelectSub = this.handleSelectSub.bind(this);
    this.handleGetFrontPage = this.handleGetFrontPage.bind(this);
    this.handleFetchPosts = this.handleFetchPosts.bind(this);
    this.handleForceRefresh = this.handleForceRefresh.bind(this);
  }

  componentDidMount() {
    // this.handleFetchPosts()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSub !== this.props.selectedSub) {
      this.handleFetchPosts();
    }
  }

  handleSelectSub(sr_display_name) {
    return this.props.selectSubreddit(sr_display_name);
  }

  handleGetFrontPage() {
    return this.props.fetchPostsIfNeeded(FRONT_PAGE);
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
          <Button content="getFrontPage" onClick={this.handleGetFrontPage} />
          <Button content="fetchPosts" onClick={this.handleFetchPosts} />
          <br />
          <Icon
            name="refresh"
            size="large"
            color="black"
            loading={this.props.isFetching}
            link
            onClick={this.handleForceRefresh}
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
