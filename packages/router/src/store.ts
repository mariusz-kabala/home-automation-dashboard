import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { reducer } from './state/reducer'
import thunk from 'redux-thunk'

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const staticReducers = {
  host: reducer,
};

/**
 * Cf. redux docs:
 * https://redux.js.org/recipes/code-splitting/#defining-an-injectreducer-function
 */
export default function configureStore() {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? compose(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({} as any))
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(thunk));
  const store: any = createStore(createReducer(), enhancer);

  store.asyncReducers = {};

  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  return store;
}

function createReducer(asyncReducers?) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}

export const store = configureStore();
