import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './views/App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from "@sentry/browser";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
//add redux and redux persist

//by default, Sentry uses a null DSN, a no-op connection is used and won't attempt to connect or anything, effectively disabling it.
if(process.env.SENTRY_DSN){
    Sentry.init({dsn: process.env.SENTRY_DSN});
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
