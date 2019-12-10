import React from 'react';
import PropType from 'prop-types';
import { Button } from "shards-react";
import {register} from "../../utils/requests/UserRequests"

import './styles.scss';

/**
 * @description container component that should be in the middle of the login page
 */
export const RegisterContainer = ({ handleButtonClick }) => {
  return (
    <div className="register__container">
      <p>Maybe something should go here...</p>
      <Button onClick={handleButtonClick}>Register button</Button>
    </div>
  )
}

export default (props) => {

  /**
   * @description handler for button in login container
   */
  const handleButtonClick = async () => {
    await register({email: "testtesttest@email.com", password: "Password123.", firstName: "test", lastName: "test"});
  };

  return (
    <div className="page__register">
      <RegisterContainer handleButtonClick={handleButtonClick}/>
    </div>
  );
}

RegisterContainer.propTypes = {
  handleButtonClick: PropType.func.isRequired
};
