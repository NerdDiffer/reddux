import React from 'react';
import { Container, Card, Header, Icon, List } from 'semantic-ui-react';

const AuthInfo = () => (
  <Card.Group itemsPerRow={1} className="auth info">
    <Card>
      <Card.Content>
        <Card.Header>
          How are you using these account permissions?
        </Card.Header>
        <Card.Description>
          Here are some application features, grouped by their OAuth scope (permission type):
          <br />
          <List bulleted>
            <List.Content>
              <List.Item>
                <strong>read</strong>: fetch the most popular subreddits
              </List.Item>
              <List.Item>
                <strong>mysubreddits</strong>: fetch a list of your subreddit subscriptions
              </List.Item>
              <List.Item>
                <strong>subscribe</strong>: manage your subreddit subscriptions
              </List.Item>
            </List.Content>
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  </Card.Group>
);

export default AuthInfo;
