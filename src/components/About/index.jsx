import React from 'react';
import HeaderIcon from './HeaderIcon';
import Details from './Details';

const About = ({ showHeader = true }) => (
  <div className="about">
    {showHeader ? <HeaderIcon /> : null}
    <Details />
  </div>
);

export default About;
