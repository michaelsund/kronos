import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Toolbar from '../components/toolbar';
import Home from '../containers/home';
import About from '../containers/about';

export default function Routes() {
  return (
    <Route path="/" component={Toolbar}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="about" component={About} />
    </Route>
  );
}
