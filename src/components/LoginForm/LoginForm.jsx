import React, { useState } from "react";
import PropType from "prop-types";
import {loginFormInputs} from "./loginFormConstants";
import {login} from "../../utils/requests/UserRequests";
import {Alert, Tooltip, Button, Form, FormGroup, FormInput} from "shards-react";
import "./styles.scss";

export const LoginForm = ({handleButtonClick ,onChange}) => {
    return (
        <div className= "login__form">
            <Form>
                <div className="form-inputs">
                    {loginFormInputs.map((inputs , key) => 
                    <FormGroup key={key} onChange={onChange}>
                            <FormInput  invalid={false} 
                                        valid={false} 
                                        className="mb-2" 
                                        type={inputs.type} 
                                        name={inputs.name} 
                                        id={inputs.name} 
                                        placeholder ={inputs.placeholder} />       
                        </FormGroup>  
                        )
                    }
                </div>
                <FormGroup>
                    <Button size="lg" pill theme="dark" onClick= {(event) => handleButtonClick(event)}  name="submit">{"Login"}</Button> 
                </FormGroup>
            </Form>
        </div>
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
        alertType: "danger"
    });

    /**
     * Triggers the error alert banner.
     * !!!! Temporary put a success alert for successfull login. 
     * @param {String} alertType the alert type success or error.
     */
    const triggerAlert = (alertType) => {
        setAlertMessageFields({visible: !alertMessage.visible,
                               alertType: [alertType]});
    };
    /**
     * @function handleResponse
     * @description filters the error type and setting the erro message and form tip error.
     * @param {Object} response the Http response from backend.
     */
   const handleResponse = (response) => {
        if(response.status === "BAD_REQUEST"){
            let errors = response.errors;
            errors.map(error => (
                setHasErrors({...hasErrors, [error.field]: {...hasErrors[error.field], hasError: true , message: error.message}}) 
            ))
        };
  
        return setErrorMessage(response.message);
    };
    /**
     * @function handleButtonClick 
     * @description Handles the submission, calls the backend API, through login function.
     * handle the response with handleResponse function.
     * @param {Event} event 
     */
    const handleButtonClick = (event) => {
        event.preventDefault();
        login(user_credentials).then(response => {
            if(!response.token) { 
                triggerAlert("danger");
                handleResponse(response);
            }
            else {
                localStorage.setItem("token", response.token);
                triggerAlert("success");//temporary TODO: will be redirect to home. props.history.push('/home')
                setErrorMessage(response.message);//temporary
            };    
        });  
    };
    /**
     * @function onChange 
     * @description event handling function, handles the changes in the input fields.
     * @param {Event} event 
     */
    const onChange = (event) => {
        const {name, value} = event.target;
        setUserCredential((prev) => ({...prev, [name]: value}));
        setHasErrors(defaultErrors);
    };
    return (
    <div className="loginForm">
        <Alert dismissible={triggerAlert} open={alertMessage.visible} className="mb-3" theme={alertMessage.alertType}>
            {error_message}
        </Alert>
      <LoginForm handleButtonClick={handleButtonClick} onChange={onChange}/>
        {/* TODO: onChange error handling */}
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