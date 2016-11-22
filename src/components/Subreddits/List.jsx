import React, { Component } from 'react';
import { Icon, Button, Item } from 'semantic-ui-react';
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
    const { subscribedTo, collectionToShow } = this.props;

    if (!subscribedTo) {
      return null;
    } else {
      return (
        <Item.Group divided>
          {
            collectionToShow.map(({ data }, ind) => {
              const { url, name, display_name } = data;
              const payload = { url, name, display_name };
              // Keep the `isSubscribed` variable in case there are sync issues
              const isSubscribed = subscribedTo.hasOwnProperty(url);

              const handleSubscription = isSubscribed ?
                this.handleUnsubscribe.bind(null, payload) :
                this.handleSubscribe.bind(null, payload);

              return (
                <Subreddit
                  key={ind}
                  data={data}
                  isSubscribed={isSubscribed}
                  handleSubscription={handleSubscription}
                />
              );
            })
          }
        </Item.Group>
      );
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
