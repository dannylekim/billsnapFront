import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.scss";
import App from "./views/App";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/browser";

import store from './redux/billSnapConfiguredStore';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

//by default, Sentry uses a null DSN, a no-op connection is used and won't attempt to connect or anything, effectively disabling it.
if(process.env.SENTRY_DSN){
    Sentry.init({dsn: process.env.SENTRY_DSN});
}

const persistor = persistStore(store);

!localStorage.getItem("billSnap_token") && persistor.purge();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
