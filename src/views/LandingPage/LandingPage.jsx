import React, { useState } from "react";

import { Button } from "shards-react";
import TitleLogo from "../../components/TitleLogo";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
import "./styles.scss";

/**
 * @description container component that should be in the middle of the login page
 */

export default props => {
  const [formType, setFormType] = useState("register");

  return (
    <div className="page__register">
      <div className="title-logo">
        <TitleLogo />
      </div>
      <div className="register__container">
        {formType === "register" ? <RegisterForm /> : <LoginForm />}
        <div>
          <h6>
            {formType === "login" ? "New to Billsnap? " : "Have an account? "}
            <Button
              className="login-link"
              onClick={() =>
                setFormType(formType === "login" ? "register" : "login")
              }
            >
              {formType === "login"
                ? "Register an account."
                : "Login to your account."}{" "}
            </Button>
          </h6>
        </div>
      </div>
    </div>
  );
};
