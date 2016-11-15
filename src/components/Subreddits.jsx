import React, { Component } from 'react';
import apiClient, {
  subreddits as getSubreddits
} from '../api';

class Subreddits extends Component {
  componentWillMount() {
    getSubreddits(apiClient);
  }

  render() {
    return(
      <div className="subreddits">
      </div>
    );
  }
}

export default Subreddits;
