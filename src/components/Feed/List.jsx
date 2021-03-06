import React, { Component } from 'react';
import { Message, Item, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Post from './Post';
import FeedControls from './Controls';

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  renderChildren() {
    const { items } = this.props;

    if (!items) {
      return null;
    } else {
      return (
        <Item.Group divided>
          {items.map((data, ind) => <Post data={data} key={ind} />)}
        </Item.Group>
      );
    }
  }

  render() {
    return (
      <div className="posts">
        <h2>Feed</h2>
        <FeedControls />
        <Divider />
        {this.renderChildren()}
      </div>
    );
  }
}

const mapStateToProps = ({ feed }) => {
  const { items } = feed;
  return { items };
};

const ConnectedFeed = connect(
  mapStateToProps
)(Feed);

export default ConnectedFeed;
