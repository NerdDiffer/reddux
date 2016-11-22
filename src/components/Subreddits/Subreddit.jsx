import React from 'react';
import { Item, Icon, Button, Header } from 'semantic-ui-react';

const renderSubscribeButton = (isSubscribed, handleSubscription) => {
  let content;
  let icon;

  if (isSubscribed) {
    content = 'Unsubscribe';
    icon = 'remove circle';
  } else {
    content = 'Subscribe';
    icon = 'add circle';
  }

  return (
    <Button
      content={content}
      icon={icon}
      onClick={handleSubscription}
    />
  );
};

// Shows one individual subreddit in a list
const Subreddit = ({ data, handleSubscription, isSubscribed }) => {
  const { url, display_name, public_description } = data;

  return (
    <Item>
      <Item.Header>
        {renderSubscribeButton(isSubscribed, handleSubscription)}
      </Item.Header>
      <Item.Content>
        <Header textAlign="left" content={display_name} subheader={url} />
        <Item.Description>
          {public_description}
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

export default Subreddit;
