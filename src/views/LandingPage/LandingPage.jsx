import React, {useState} from "react"; 
import PropType from "prop-types";
import { Button } from "shards-react";
import TitleLogo from "../../components/TitleLogo";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
import "./styles.scss";

/**
 * @description container component that should be in the middle of the login page
 */
export const RegisterLoginContainer = ({ handleButtonClick,formType,setFormType }) => {
  return (
    <div className="register__container">
     {formType === "register" ? 
       <RegisterForm handleButtonClick = {handleButtonClick} setFormType={setFormType} /> :
       <LoginForm handleButtonClick={handleButtonClick} setFormType={setFormType} />
      }
    </div>
  );
};

export default props => {
  const [formType, setFormType] =  useState("register");
  /**
   * @description handler for button in login container
   */
  //need redux for global state, otherwise learn how to pass forward and backwords with hooks.
  const handleButtonClick = () => {
    console.log("nice");
  };
  return (
    <div className="page__register"> 
      <div className="title-logo">
        <TitleLogo />
      </div>
      <div className="register__container">
        <RegisterLoginContainer handleButtonClick={handleButtonClick} formType={formType} setFormType={setFormType}/> 
        <div>
            <h6> {formType === "login" ? "New to Billsnap? " : "Have an account? "}  
                <Button className="login-link" onClick={() => setFormType(formType === "login" ? "register" : "login")}>
                    {formType === "login" ?  "Register an account." : "Login to your account."} </Button>
                    
            </h6>
        </div>
      </div>
    </div>
  );
};

RegisterLoginContainer.propTypes = {
  handleButtonClick: PropType.func.isRequired
};
