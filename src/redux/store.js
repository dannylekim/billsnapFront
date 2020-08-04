/**
 * Redux configuration for Bill Snap
 */

import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

const middlewares = [thunkMiddleware];

/**
 * If in dev mode, enable redux logger.
 */
if (process.env.NODE_ENV === "development") {
  const { createLogger } = require("redux-logger");

  const logger = createLogger({
    // You may have the logger point to a SINGLE action if you want.
    // Logs every actions by default.
    // predicate: (getState, action) => action.type === '',
    duration: true,
    timestamp: true,
  });

  /**
   * Comment this line out if you don't want redux logger
   */
  middlewares.push(logger);
}

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

export default store;
