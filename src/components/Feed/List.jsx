import React, { Component } from 'react';
import { Icon, Button, Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions/posts';
import { handleGetMySubreddits } from '../../state/actions/subreddits';
import Post from './Post';
import SelectSubreddit from './SelectSubreddit';
import AuthUrl from '../Auth/AuthUrl';

class Feed extends Component {
  constructor(props) {
    super(props);

    this.handleSelectSub = this.handleSelectSub.bind(this);
    this.handleGetFrontPage = this.handleGetFrontPage.bind(this);
    this.handleFetchPosts = this.handleFetchPosts.bind(this);
    this.handleForceRefresh = this.handleForceRefresh.bind(this);

    this.renderControls = this.renderControls.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
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
    return this.props.fetchPostsIfNeeded('_front_page');
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

  renderControls() {
    const { hasAuthToken } = this.props;

    if (!hasAuthToken) {
      const header = 'You have not authorized access to your Reddit account';

      return (
        <Message warning>
          <Message.Header>{header}</Message.Header>
          <AuthUrl />
        </Message>
      );
    } else {
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

  renderChildren() {
    const { items } = this.props;

    if (!items) {
      return null;
    } else {
      return items.map((data, ind) => <Post data={data} key={ind} />);
    }
  }

  render() {
    return (
      <div className="posts">
        <h2>Feed</h2>
        {this.renderControls()}
        <br />
        {this.renderChildren()}
      </div>
    );
  }
}


const mapStateToProps = ({ posts = {}, subreddits, auth }) => {
  const { selectedSub } = posts;
  const { subscribedTo: mySubs } = subreddits;

  const postsInSelectedSub = posts[selectedSub] || {
    isFetching: false,
    items: [],
    errorMessage: null
  };

  const {
    isFetching,
    items,
    errorMessage,
    lastUpdated
  } = postsInSelectedSub;

  return {
    isFetching,
    items,
    errorMessage,
    lastUpdated,
    selectedSub,
    mySubs,
    hasAuthToken: auth.hasToken
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions,
  handleGetMySubreddits
}, dispatch);

const ConnectedFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default ConnectedFeed;
