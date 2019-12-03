import React from 'react';

/**
 * Load you page components here. We will render them via routes
 */
// import LoginPage from '../Login/Login';
import RegisterPage from '../Register/Register';


import './styles.scss';

export default (props) => {
  const appName = process.env.REACT_APP_NAME;

  return (
    <div className="App">
      <header className="App-header">
        {appName}
      </header>
        <div className="App__container"><RegisterPage /></div>
    </div>
  );
}
