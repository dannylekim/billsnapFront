import React from 'react';

/**
 * Load you page components here. We will render them via routes
 */
// import LoginPage from '../Login/Login';
import RegisterPage from '../Register/Register';
import LoginPage from '../Login/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import './styles.scss';

export default (props) => {
  const appName = process.env.REACT_APP_NAME;

  return (
    <div className="App">
      <header className="App-header">
        <a className="header-name" href= "/">{appName}</a>
      </header>
      <BrowserRouter>
        <Switch>
          <div className="App__container">
            <Route path="/" exact component={RegisterPage}/>
            <Route path="/Login" exact component={LoginPage}/>
            </div>
          <Route path="/dashboard" exact/>
          <Route path="/" render={() => <div>404</div> }/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
