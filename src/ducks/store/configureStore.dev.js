import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

// import middleware
import logger from "redux-logger";
import thunk from 'redux-thunk';

// import reducer
import reducer from "../reducer";

function configureStore(preLoadedState) {
  // middleware
  const middleware = [ thunk, logger ];

  const middlewareEnhancer = applyMiddleware(...middleware);

  const enhancers = [ middlewareEnhancer ];

  const composedEnhancers = composeWithDevTools(...enhancers);

  return createStore(reducer, preLoadedState, composedEnhancers);
}

export default configureStore;