import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ToolBar from '../components/toolbar';
import Timers from '../containers/timers';
import Accounts from '../containers/accounts';

export default function Routes() {
  require('../assets/css/main.css');

  return (
    <Route path="/" component={ToolBar}>
      <IndexRoute component={Timers} />
      <Route path="timers" component={Timers} />
      <Route path="accounts" component={Accounts} />
    </Route>
  );
}
