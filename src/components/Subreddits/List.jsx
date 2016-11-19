import React, { Component } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { subreddits } from '../../api';
import Subreddit from './Subreddit';

const { getMySubreddits, getPopularSubreddits, postToSubscription } = subreddits;

class Subreddits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subscribedTo: [],
      selectedCollection: [],
      nameOfSelectedCollection: null,
      isFetching: false
    };

    this.renderChildren = this.renderChildren.bind(this);
    this.handleGetMySubreddits = this.handleGetMySubreddits.bind(this);
    this.handleGetPopularSubreddits = this.handleGetPopularSubreddits.bind(this);
    this.handleSubscription = this.handleSubscription.bind(this);
    this.handleSubscribe = this.handleSubscription.bind(this, 'sub');
    this.handleUnsubscribe = this.handleSubscription.bind(this, 'unsub');
  }

  componentDidMount() {
    // this.handleGetMySubreddits();
  }

  handleGetMySubreddits() {
    this.setState({ isFetching: true });

    getMySubreddits()
      .then(res => {
        const { children } = res.data;
        console.log(children);

        // store an object of subreddit subscriptions, indexed by their url
        const subscribedTo = children.reduce((obj, { data }) => {
          const { url, name } =  data;
          obj[url] = name;

          return obj;
        }, {});

        this.setState({
          subscribedTo,
          selectedCollection: children,
          nameOfSelectedCollection: 'My',
          isFetching: false
        });
      });
  }

  handleGetPopularSubreddits() {
    this.setState({ isFetching: true });

    getPopularSubreddits()
      .then(res => {
        const { children } = res.data;
        console.log(children);

        this.setState({
          selectedCollection: children,
          nameOfSelectedCollection: 'Popular',
          isFetching: false
        });
      });
  }

  handleSubscription(action, subredditName) {
    console.log(action, subredditName);
    const params = { action, sr: subredditName };
    // TODO: handle response, update state, etc
    postToSubscription(params);
  }

  renderHeader() {
    const { nameOfSelectedCollection } = this.state;

    return (
      nameOfSelectedCollection ?
        <h3>{`${nameOfSelectedCollection} Subreddits`}</h3> :
        null
    );
  }

  renderChildren() {
    const { selectedCollection, subscribedTo } = this.state;

    if (!selectedCollection) {
      return null;
    } else {
      return selectedCollection.map(({ data }, ind) => {
        const { title, url, name } = data;
        const isSubscribed = subscribedTo.hasOwnProperty(url);

        const handleSubscription = isSubscribed ?
          () => this.handleUnsubscribe(name) :
          () => this.handleSubscribe(name);

        return (
          <Subreddit
            key={ind}
            title={title}
            url={url}
            name={name}
            isSubscribed={isSubscribed}
            handleSubscription={handleSubscription}
          />
        );
      });
    }
  }

  render() {
    const { isFetching } = this.state;

    return(
      <div className="subreddits">
        <h2>Subreddits</h2>
        <Button content="getMySubreddits" onClick={this.handleGetMySubreddits} />
        <Button content="getPopularSubreddits" onClick={this.handleGetPopularSubreddits} />
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

export default Subreddits;
