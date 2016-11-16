import React, { Component } from 'react';
import apiClient, {
  getFrontPage
} from '../api';
import Post from './Post';

class FrontPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };

    this.renderChildren = this.renderChildren.bind(this);
  }

  componentDidMount() {
    getFrontPage(apiClient)
      .then(res => {
        console.log(res);
        const { children } = res.data.data;

        this.setState({ posts: children });
      });
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
        {this.renderChildren()}
      </div>
    );
  }
}

export default FrontPage;
