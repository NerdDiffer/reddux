import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import Nav from './Nav';

const App = () => (
  <Container
    className="app"
    textAlign="center"
    text
  >
    <Segment>
      <Nav />
      <h1>Reddit Reader</h1>
    </Segment>
  </Container>
);

export default App;
