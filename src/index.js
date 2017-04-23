import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './routes';

/* eslint no-underscore-dangle: 0 */
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const history = syncHistoryWithStore(hashHistory, store);

const App = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router routes={routes()} history={history} />
    </Provider>
  </MuiThemeProvider>
);

injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
