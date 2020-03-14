import React from 'react';
/**
 * Load you page components here. We will render them via routes
 */
import RegisterPage from '../Register/Register';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { Logo } from '../../components/Logo/Logo.jsx';

import './styles.scss';

export default (props) => {
  
  return (
    <div className="App">
        <div className="App-logo">
            <Logo />
        </div>
        <Navbar className="App-navbar"/>

      <RegisterPage />
    </div>
  );
}
