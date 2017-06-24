import React from 'react';
import ReactDOM from 'react-dom';
import {
  orange500,
  grey400
} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './routes';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange500,
    primary2Color: orange500,
    primary3Color: grey400,
  }
});

/* eslint no-underscore-dangle: 0 */
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const history = syncHistoryWithStore(hashHistory, store);

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
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
