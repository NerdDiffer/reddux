import React, { Component } from 'react';
import { Icon, Button, Item } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as subredditActions from '../../state/actions/subreddits';
import * as subscriptionActions from '../../state/actions/subscriptions';
import Subreddit from './Subreddit';

class Subreddits extends Component {
  constructor(props) {
    super(props);

    this.renderChildren = this.renderChildren.bind(this);
    this.fetchSubs = this.fetchSubs.bind(this);

    this.handleShowMySubscriptions = this.handleShowMySubscriptions.bind(this);
    this.handleShowPopularSubs = this.handleShowPopularSubs.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleUnsubscribe = this.handleUnsubscribe.bind(this);
  }

  componentDidMount() {
    const { subscriptions, popularSubreddits } = this.props;

    // TODO: use a "lastUpdated" timestamp or boolean flag in state, so you
    // don't have to run this code every time.
    if (Object.keys(subscriptions).length < 1 || Object.keys(popularSubreddits).length < 1) {
      this.fetchSubs();
    }
  }

  fetchSubs() {
    return this.props.handleGetMySubreddits()
      .then(() => this.props.handleGetPopularSubreddits());
  }

  handleShowMySubscriptions() {
    const { subscriptions } = this.props;
    const names = Object.keys(subscriptions);
    this.props.showSubredditCollection(names, 'My');
  }

  handleShowPopularSubs() {
    const { popularSubreddits } = this.props;
    this.props.showSubredditCollection(popularSubreddits, 'Popular');
  }

  handleSubscribe(payload) {
    return this.props.handleSubscribe(payload);
  }

  handleUnsubscribe(payload) {
    return this.props.handleUnsubscribe(payload);
  }

  renderHeader() {
    const { nameOfCollectionToShow } = this.props;

    return (
      nameOfCollectionToShow ?
        <h3>{`${nameOfCollectionToShow} Subreddits`}</h3> :
        null
    );
  }

  renderChildren() {
    const { subscriptions, collectionToShow } = this.props;

    if (!collectionToShow) {
      return null;
    } else {
      const subs = collectionToShow.map((subreddit, ind) => {
        const { url, name, display_name } = subreddit;

        const isSubscribed = subscriptions && subscriptions.hasOwnProperty(display_name);

        const handleSubscription = isSubscribed ?
          this.handleUnsubscribe.bind(null, { display_name }) :
          this.handleSubscribe.bind(null, { url, name, display_name });

        return (
          <Subreddit
            key={display_name}
            data={subreddit}
            isSubscribed={isSubscribed}
            handleSubscription={handleSubscription}
          />
        );
      });

      return (
        <Item.Group divided>
          {subs}
        </Item.Group>
      );
    }

  }

  render() {
    const { isFetching } = this.props;

    return(
      <div className="subreddits">
        <h2>Subreddits</h2>
        <Button content="my subscriptions" onClick={this.handleShowMySubscriptions} />
        <Button content="popular subreddits" onClick={this.handleShowPopularSubs} />
        <br />
        <Icon
          name="refresh"
          size="large"
          color="black"
          loading={isFetching}
        />
        {this.renderHeader()}
        {this.renderChildren()}
      </div>
    );
  }
}

const mapStateToProps = ({ subreddits, lists }) => {
  return { ...subreddits, ...lists };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...subredditActions,
    ...subscriptionActions
  }, dispatch)
);

const ConnectedSubreddits = connect(
  mapStateToProps,
  mapDispatchToProps
)(Subreddits);

export default ConnectedSubreddits;
