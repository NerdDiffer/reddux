import React, { Component } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions/subreddits';
import Subreddit from './Subreddit';

class Subreddits extends Component {
  constructor(props) {
    super(props);

    this.renderChildren = this.renderChildren.bind(this);
    this.handleGetMySubreddits = this.handleGetMySubreddits.bind(this);
    this.handleGetPopularSubreddits = this.handleGetPopularSubreddits.bind(this);

    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleUnsubscribe = this.handleUnsubscribe.bind(this);
  }

  componentDidMount() {
    // this.handleGetMySubreddits();
  }

  handleGetMySubreddits() {
    return this.props.handleGetMySubreddits();
  }

  handleGetPopularSubreddits() {
    return this.props.handleGetPopularSubreddits();
  }

  handleSubscribe({ url, name }) {
    return this.props.handleSubscribe({ url, name });
  }

  handleUnsubscribe({ url, name }) {
    return this.props.handleUnsubscribe({ url, name });
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
    const { subscribedTo, collectionToShow } = this.props;

    if (!subscribedTo) {
      return null;
    } else {
      return collectionToShow.map(({ data }, ind) => {
        const { title, url, name } = data;
        const isSubscribed = subscribedTo.hasOwnProperty(url);

        const handleSubscription = isSubscribed ?
          () => this.handleUnsubscribe({ url, name }) :
          () => this.handleSubscribe({ url, name });

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
    const { isFetching } = this.props;

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

const mapStateToProps = ({ subreddits }) => ({ ...subreddits });

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

const ConnectedSubreddits = connect(
  mapStateToProps,
  mapDispatchToProps
)(Subreddits);

export default ConnectedSubreddits;
