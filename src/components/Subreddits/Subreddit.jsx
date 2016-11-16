import React from 'react';
import { Item, Icon, Button } from 'semantic-ui-react';

// Shows one individual subreddit in a list
const Subreddit = (props) => {
  const { url, title, name, isSubscribed, handleSubscription } = props;

  const renderSubscribeButton = () => {
    if (isSubscribed) {
      return (
        <Button content="Unsubscribe" icon="remove circle" onClick={handleSubscription} />
      );
    } else {
      return (
        <Button content="Subscribe" icon="add circle" onClick={handleSubscription} />
      );
    }
  };

  return (
    <Item>
      <Item.Extra>{renderSubscribeButton()}</Item.Extra>
      <Item.Header as="a">{title}</Item.Header>
      <Item.Meta>{url}</Item.Meta>
    </Item>
  );
};

export default Subreddit;
