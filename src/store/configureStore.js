/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import devTools from 'remote-redux-devtools';
import rootReducer from '../reducers';

const configureStore = (initialState) => {
  // TODO fix local devtools setup
  console.log(`local NODE_ENV is ${process.env.NODE_ENV}`);
  const middleware = compose(
    applyMiddleware(thunk),
    persistState(),
    process.env.NODE_ENV === 'development' ? devTools({ realtime: true, port: 8000 }) : f => f
  );

  const store = createStore(
    rootReducer,
    initialState,
    middleware
  );

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        const nextReducer = require('../reducers').default;

        store.replaceReducer(nextReducer);
      });
    }
  }

  return store;
};

export default configureStore;
