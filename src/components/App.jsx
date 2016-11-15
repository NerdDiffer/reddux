import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import Nav from './Nav';

const App = (props) => (
  <Container
    className="app"
    textAlign="center"
    text
  >
    <Segment>
      <Nav />
      <h1>Reddit Reader</h1>
      {props.children}
    </Segment>
  </Container>
);

export default App;
