import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from '../components/home';

export default function Routes() {
  return (
    <Route path="/" component={Home}>
      <IndexRoute component={Home} />
      {/* <Route path="about" component={About} />
      <Route path="*" component={NotFound} status={404} /> */}
    </Route>
  );
}
