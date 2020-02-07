import React from 'react';
import PropType from 'prop-types';
import LoginForm from "../../components/LoginForm";
import './styles.scss';

/**
 * @description container component that should be in the middle of the login page
 */
export const LoginContainer = ({ handleButtonClick,setFormType }) => {
  return (
    <div className="login__container">
      <LoginForm handleButtonClick = {handleButtonClick} setFormType={setFormType} />
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
