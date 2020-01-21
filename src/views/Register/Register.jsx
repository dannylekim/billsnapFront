import React from "react";
import PropType from "prop-types";
import { Button } from "shards-react";

import TitleLogo from "../../components/TitleLogo";

import "./styles.scss";

/**
 * @description container component that should be in the middle of the login page
 */
export const RegisterContainer = ({ handleButtonClick }) => {
  return (
    <div className="register__container">
      <p>Maybe something should go here...</p>
      <Button onClick={handleButtonClick}>Register button</Button>
    </div>
  );
};

export default props => {
  /**
   * @description handler for button in login container
   */

  const handleButtonClick = () => {
    console.log("nice");
  };

  return (
    <div className="page__register">
      <div>
        <TitleLogo />
      </div>
      <RegisterContainer handleButtonClick={handleButtonClick} />
    </div>
  );
};

RegisterContainer.propTypes = {
  handleButtonClick: PropType.func.isRequired
};
