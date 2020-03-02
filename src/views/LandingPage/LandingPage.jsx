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
  const {history} = props;
  return (
    <div className="page__landing">
      <div className="title__logo" id="flex__item">
        <TitleLogo />
      </div>
        <div id="flex__item">
           {formType === "register" ? <RegisterForm setFormType = {setFormType} history={history} /> : <LoginForm setFormType = {setFormType} history={history}/>}
        </div>
    </div>
  );
};
