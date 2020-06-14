import React from 'react';
/**
 * Load you page components here. We will render them via routes
 */
import RegisterPage from '../Register/Register';
import NavbarLayer from '../NavbarLayer';

import './styles.scss';

export default (props) => {
  return (
    <div className="App">
      <NavbarLayer />
      <RegisterPage />
    </div>
  );
}
