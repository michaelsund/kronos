import React from 'react';
import { Link, browserHistory } from 'react-router';

class About extends React.Component {
  render() {
    return (
      <div>
        <span>about</span>
        <Link to="/home">TO HOME</Link>
      </div>
    );
  }
}

export default About;
