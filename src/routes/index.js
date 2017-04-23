import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ToolBar from '../components/toolbar';
import Home from '../containers/home';
import About from '../containers/about';

export default function Routes() {
  return (
    <Route path="/" component={ToolBar}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="about" component={About} />
    </Route>
  );
}
