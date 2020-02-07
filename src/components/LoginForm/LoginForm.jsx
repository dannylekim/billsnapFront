import React, { useState } from "react";
import PropType from "prop-types";
import {loginFormInputs} from "./loginFormConstants";
import LoginRegisterForm from "../forms/LoginRegisterForm";
import {login} from "../../utils/requests/UserRequests";
import "./styles.scss";

export const LoginForm = ({handleButtonClick ,onChange}) => {
    const formProps = {
        type: "login",
        form_className : "login__form",
        constants : loginFormInputs,
        handleButtonClick,
        onChange,
        buttonValue: "Login"
    };

    return (
        <LoginRegisterForm formProps = {formProps}/>
    );
};

export default (props) => {
    const [user_credentials, setUserCredential] = useState({}); 
    //const [error_message, setErrorMessage] = useState(""); 

    const handleButtonClick = (event) => {
        event.preventDefault();
        login(user_credentials).then(response => {
        alert(JSON.stringify(response))//set error message 
        });  
    };

    const onChange = (event) => {
        const {name, value} = event.target;
        setUserCredential({...user_credentials, [name]: value});
    };
    return (
    <div className="loginForm">
      <LoginForm handleButtonClick={handleButtonClick} onChange={onChange}/>
    </div>
    );
};

LoginForm.propTypes = {
    handleButtonClick: PropType.func.isRequired
  };