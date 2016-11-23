import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const Details = () => (
  <Card.Group itemsPerRow={2} className="about details">
    <Card>
      <Card.Content>
        <Card.Header>What is this?</Card.Header>
        <Card.Description>
          A Reddit API client. Browse posts from your front page and subscriptions.
        </Card.Description>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Card.Header>Who made it?</Card.Header>
        <Card.Description>
          Rafael Espinoza.
        </Card.Description>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Card.Header>Can I see the source code?</Card.Header>
        <Card.Description>
          <a href="https://github.com/NerdDiffer/reddux" target="_blank">
            <Icon name="github square" link color="black" size="big" />
          </a>
        </Card.Description>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Card.Header>What does "Reddux" mean?</Card.Header>
        <Card.Description>
          It's a play on words. One, you get to use Reddit. Two, it makes use
          of <a href="http://redux.js.org" target="_blank">Redux</a>, for
          managing application state.
        </Card.Description>
      </Card.Content>
    </Card>
  </Card.Group>
);

export default Details;
