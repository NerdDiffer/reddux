import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import Nav from './Nav';
import FlashMessage from './FlashMessage';

const App = (props) => (
  <Container
    className="app"
    textAlign="center"
    text
  >
    <Segment>
      <Nav />
      <FlashMessage />
      <h1>Reddux</h1>
      {props.children}
    </Segment>
  </Container>
);

export default App;
