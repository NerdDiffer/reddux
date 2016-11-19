import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { getFrontPage } from '../api';
import Post from './Post';

class FrontPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isFetching: false,
    };

    this.renderChildren = this.renderChildren.bind(this);
    this.handleGetFrontPage = this.handleGetFrontPage.bind(this);
  }

  componentDidMount() {
    this.handleGetFrontPage();
  }

  handleGetFrontPage() {
    this.setState({ isFetching: true });

    getFrontPage()
      .then(res => {
        const { children } = res.data;

        this.setState({
          posts: children,
          isFetching: false
        });
      })
      .catch(err => err);
  }

  renderChildren() {
    const { posts } = this.state;
    if (!posts) { return null; }

    return posts.map(({ data }, ind) => {
      const { title, url, thumbnail } = data;

      return <Post key={ind} title={title} url={url} thumbnail={thumbnail} />;
    });
  }

  render() {
    return(
      <div className="subreddits">
        <h2>FrontPage</h2>
        <Icon
          name="refresh"
          size="large"
          color="black"
          loading={this.state.isFetching}
        />
        <br />
        {this.renderChildren()}
      </div>
    );
  }
}

export default FrontPage;
