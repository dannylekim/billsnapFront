import React from 'react';

import { GenericButton } from '../../components/button';

import './styles.scss';

/**
 * @description container component that should be in the middle of the login page
 */
export const LoginContainer = (props) => {

  /**
   * @description handler for button in login container
   */
  const handleButtonClick = () => {
    console.log('nice')
  }

  return (
    <div className="login__container">
      <p>Maybe something should go here...</p>
      <GenericButton title="Login button" onClick={handleButtonClick}/>
    </div>
  )
}

export default (props) => {
  return (
    <div className="page__login">
      <LoginContainer />
    </div>
  );
}
