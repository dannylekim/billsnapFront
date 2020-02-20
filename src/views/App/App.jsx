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
              <div className="App__name">
                  {appName}
              </div>
              <div className="App__logo">
                  <img
                      src="https://via.placeholder.com/40x40.png?text=40x40+Logo"
                      alt="Logo"
                  />
              </div>
      </header>
      <RegisterPage />
    </div>
  );
}
