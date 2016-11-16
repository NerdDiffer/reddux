import React, { Component } from 'react';
import apiClient, {
  subreddits as getSubreddits
} from '../api';
import Subreddit from './Subreddit';

class Subreddits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collection: []
    };

    this.renderChildren = this.renderChildren.bind(this);
  }

  componentDidMount() {
    getSubreddits(apiClient)
      .then(res => {
        console.log(res);
        const { children } = res.data.data;

        this.setState({ collection: children });
      });
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
    return(
      <div className="subreddits">
        <h2>My Subreddits</h2>
        {this.renderChildren()}
      </div>
    );
  }
}

export default Subreddits;
