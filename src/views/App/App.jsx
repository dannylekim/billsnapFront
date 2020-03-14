import React from 'react';

/**
 * Load you page components here. We will render them via routes
 */
// import LoginPage from '../Login/Login';
import RegisterPage from '../Register/Register';
import Navbar from '../../components/Navbar/Navbar.jsx';

import './styles.scss';

export default (props) => {

  return (
    <div className="App">
        <Navbar className="App-navbar"/>
      <RegisterPage />
    </div>
  );
}
