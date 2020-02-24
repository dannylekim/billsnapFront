import React, { useState } from "react";
import TitleLogo from "../../components/TitleLogo";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";
import "./styles.scss";

/**
 * @description container component that should be in the middle of the login page
 */

export default props => {
  const [formType, setFormType] = useState("register");

  return (
    <div className="page__landing">
      <div className="title-logo" id="flex-item">
        <TitleLogo />
      </div>
        <div className="register__form" id="flex-item">
           {formType === "register" ? <RegisterForm setFormType = {setFormType} /> : <LoginForm setFormType = {setFormType}/>}
        </div>
    </div>
  );
};
