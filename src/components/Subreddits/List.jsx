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
      collection: [],
      isFetching: false,
      currentSelection: null
    };

    this.renderChildren = this.renderChildren.bind(this);
    this._handleResponse = this._handleResponse.bind(this);
    this.handleGetMySubreddits = this.handleGetMySubreddits.bind(this);
    this.handleGetPopularSubreddits = this.handleGetPopularSubreddits.bind(this);
  }

  componentDidMount() {
    this.handleGetMySubreddits();
  }

  _handleResponse(res, name) {
    console.log(res);
    const { children } = res.data.data;

    this.setState({
      collection: children,
      isFetching: false
    });
  }

  handleGetMySubreddits() {
    this.setState({ isFetching: true });

    getMySubreddits(apiClient)
      .then(res => {
        this._handleResponse(res);
        this.setState({ currentSelection: 'My' })
      });
  }

  handleGetPopularSubreddits() {
    this.setState({ isFetching: true });

    getPopularSubreddits(apiClient)
      .then(res => {
        this._handleResponse(res);
        this.setState({ currentSelection: 'Popular' })
      });
  }

  renderHeader() {
    const { currentSelection } = this.state;
    return (currentSelection ? <h3>{`${currentSelection} Subreddits`}</h3> : null);
  }

  renderChildren() {
    const { collection } = this.state;
    if (!collection) { return null; }

    return collection.map(({ data }, ind) => {
      const { title, url } = data;

      return <Subreddit key={ind} title={title} url={url} />;
    });
  }

  render() {
    const { isFetching, currentSelection } = this.state;

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
