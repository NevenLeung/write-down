import { applyMiddleware, compose, createStore } from "redux";

// import reducer
import reducer from "./reducer";

// import middleware
import logger from "redux-logger";

function configureStore(preloadedState) {
  // middleware
  const middlewares = [
    logger,
  ];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [
    middlewareEnhancer,
  ];

  const composedEnhancers = compose(...enhancers);

  return createStore(reducer, preloadedState, composedEnhancers);
}

export default configureStore;