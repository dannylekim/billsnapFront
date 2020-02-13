import React, { useState } from "react";
import PropType from "prop-types";
import {loginFormInputs} from "./loginFormConstants";
import LoginRegisterForm from "../LoginRegisterForm/LoginRegisterForm";
import {login} from "../../utils/requests/UserRequests";
import {Alert, Tooltip} from "shards-react";
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
    const defaultErrors = {
        email:      {    
                        hasError:false,
                        message: "" 
                    },
        password:   {   hasError:false,
                        message: "" 
                    }   
    };

    const [user_credentials, setUserCredential] = useState({}); 
    const [error_message, setErrorMessage] = useState("");
    const [hasErrors, setHasErrors] = useState(defaultErrors);
    const [alertMessage, setAlertMessageFields] = useState({
        visible: false,
    });
    
    const triggerAlert = () => {
        setAlertMessageFields({visible: !alertMessage.visible});
    };

    /*
    Cases: 
    1) blank: BAD_REQUEST {"message":"Invalid Login Inputs. Please fix the following errors",
    "errors":[{"field":"email","rejectedValue":null,"message":"must not be blank"},
              {"field":"password","rejectedValue":null,"message":"must not be blank"}]}
    2) {"status":"UNAUTHORIZED","timestamp":"07-02-2020 12:04:06","message":"Username or password is incorrect.","errors":[]}
    3) "BAD_REQUEST", email format => error.message. 
    4)
    */
    /*
    errors.map, error.field && error.message
    
    */
   const handleResponse = (response) => {

        if(response.status === "BAD_REQUEST"){
            let errors = response.errors;
            errors.map(error => (
                setHasErrors({...hasErrors, [error.field]: {...hasErrors[error.field], hasError: true , message: error.message}}) 
            ))
        }

        const errorMessage = {
            "UNAUTHORIZED": response.message,
            "BAD_REQUEST" : response.message
        }
        return setErrorMessage(errorMessage[response.status]);
    }

    const handleButtonClick = (event) => {
        event.preventDefault();
        setHasErrors(defaultErrors);
        login(user_credentials).then(response => {
            if(!response.token) { 
                triggerAlert();
                //alert(JSON.stringify(response))//set error message 
                handleResponse(response);
            }else {
                localStorage.setItem("token", response.token);
                //set the redux state here 
                //redirect to home page, not sure how. I only know windows.location.href
                alert(response.message)

            }
        
        });  
    };

    const onChange = (event) => {
        const {name, value} = event.target;
        setUserCredential({...user_credentials, [name]: value});
    };
    return (
    <div className="loginForm">
        <Alert dismissible={triggerAlert} open={alertMessage.visible} className="mb-3" theme="danger">
            {error_message}
        </Alert>
      <LoginForm handleButtonClick={handleButtonClick} onChange={onChange}/>
    
        {["email", "password"].map((field, key) => (
            <Tooltip
                key={key}
                open={hasErrors[field].hasError}
                target={`#${field}`}
                >
               <span id="input_error"> {hasErrors[field].message} </span>
            </Tooltip>
        ))
        }
    </div>
    );
};

LoginForm.propTypes = {
    handleButtonClick: PropType.func.isRequired
  };