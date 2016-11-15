import React, { Component } from 'react';
import apiClient, {
  authorize
} from '../api';

class Authorize extends Component {
  componentWillMount() {
    authorize(apiClient);
  }

  render() {
    return(
      <div className="clientTest">
      </div>
    );
  }
}

export default Authorize;
