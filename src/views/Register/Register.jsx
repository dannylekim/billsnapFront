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
export const RegisterContainer = ({ handleButtonClick }) => {
  return (
    <div className="register__container">
       <RegisterForm handleButtonClick = {handleButtonClick} />
    </div>
  );
};

//need to rename this this to RegisterLogin
export default props => {
  const [formType, setFormType] =  useState("register");
  /**
   * @description handler for button in login container
   */
  //need redux for global state, otherwise learn how to pass forward and backwords with hooks.
  const handleButtonClick = () => {
    console.log("nice");
  };
// change the name
  return (
    <div className="page__register"> 
      <div className="title-logo">
        <TitleLogo />
      </div>
      <div className="register__container">
      {formType === "register" ? 
      <RegisterContainer handleButtonClick={handleButtonClick} setFormType={setFormType}/> : 
     
      <LoginForm handleButtonClick={handleButtonClick} setFormType={(type) => alert(type)} />
     
      }
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

RegisterContainer.propTypes = {
  handleButtonClick: PropType.func.isRequired
};
