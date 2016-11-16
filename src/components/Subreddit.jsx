import React from 'react';
import { Item, Icon } from 'semantic-ui-react';

const Subreddit = (props) => {
  const { url, title } = props;

  return (
    <Item>
      <Item.Header as="a">{title}</Item.Header>
      <Item.Meta>{url}</Item.Meta>
    </Item>
  );
};

export default Subreddit;
