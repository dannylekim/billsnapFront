import React, { PropTypes } from 'react';
import PropType from 'prop-types';
import { GenericButton } from '../../components/button';

import './styles.scss';

/**
 * @description container component that should be in the middle of the login page
 */
export const LoginContainer = ({ handleButtonClick }) => {
  return (
    <div className="login__container">
      <p>Maybe something should go here...</p>
      <GenericButton title="Login button" onClick={handleButtonClick}/>
    </div>
  )
}

export default (props) => {

  /**
   * @description handler for button in login container
   */
  const handleButtonClick = () => {
    console.log('nice')
  }

  return (
    <div className="page__login">
      <LoginContainer handleButtonClick={handleButtonClick}/>
    </div>
  );
}

LoginContainer.propTypes = {
  handleButtonClick: PropType.func.isRequired
};
