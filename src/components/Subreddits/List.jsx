import React, { Component } from 'react';
import { Item, Icon, Button } from 'semantic-ui-react';
import apiClient, { subreddits } from '../../api';

const { getMySubreddits, getPopularSubreddits } = subreddits;

const Subreddit = (props) => {
  const { url, title } = props;

  return (
    <Item>
      <Item.Header as="a">{title}</Item.Header>
      <Item.Meta>{url}</Item.Meta>
    </Item>
  );
};

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
  }

  componentDidMount() {
    this.handleGetMySubreddits();
  }

  handleGetMySubreddits() {
    this.setState({ isFetching: true });

    getMySubreddits(apiClient)
      .then(data => {
        const { children } = data;

        this.setState({
          subscribedTo: children,
          selectedCollection: children,
          nameOfSelectedCollection: 'My',
          isFetching: false
        });
      });
  }

  handleGetPopularSubreddits() {
    this.setState({ isFetching: true });

    getPopularSubreddits(apiClient)
      .then(data => {
        const { children } = data;

        this.setState({
          selectedCollection: children,
          nameOfSelectedCollection: 'Popular',
          isFetching: false
        });
      });
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
    const { selectedCollection } = this.state;

    if (!selectedCollection) {
      return null;
    } else {
      return selectedCollection.map(({ data }, ind) => {
        const { title, url } = data;
        return <Subreddit key={ind} title={title} url={url} />;
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
