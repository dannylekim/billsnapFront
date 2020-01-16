import React from 'react';

/**
 * Load you page components here. We will render them via routes
 */
// import LoginPage from '../Login/Login';
import RegisterPage from '../Register/Register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import './styles.scss';

export default (props) => {
  const appName = process.env.REACT_APP_NAME;

  return (
    <div className="App">
      <header className="App-header">
        {appName}
      </header>
      <BrowserRouter>
        <Switch>
          <div className="App__container"><Route path="/" exact component={RegisterPage}/></div>
          <Route path="/dashboard" exact/>
          <Route path="/" render={() => <div>404</div> }/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
