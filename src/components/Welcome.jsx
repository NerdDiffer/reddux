import React from 'react';
import { Divider } from 'semantic-ui-react';
import AuthUrl from './Auth/AuthUrl';
import About from './About';

const Welcome = () => (
  <div className="welcome">
    <h4>A simple browser for Reddit</h4>
    <AuthUrl content="Get Started" color="orange" />
    <Divider section />
    <About showHeader={false} />
  </div>
);

export default Welcome;
