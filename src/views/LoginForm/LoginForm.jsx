import React, { useState } from "react";
import PropType from "prop-types";
import * as data from "./loginFormConstants.json";
import { login } from "../../utils/requests/UserRequests";
import {
  Alert,
  Tooltip,
  Button,
  Form,
  FormGroup,
  FormInput
} from "shards-react";
import "./styles.scss";

export const LoginForm = ({ handleButtonClick, onChange, hasErrors }) => {
  return (
    <div className="login__form">
      <Form>
        <div className="form-inputs">
          {data.loginFormInputs.map((inputs, key) => (
            <FormGroup key={key} onChange={onChange}>
              <FormInput
                className="mb-2"
                type={inputs.type}
                name={inputs.name}
                id={inputs.name}
                placeholder={inputs.placeholder}
              />
            </FormGroup>
          ))}
        </div>
        <FormGroup>
          <Button
            size="lg"
            pill
            theme="dark"
            onClick={event => handleButtonClick(event)}
            name="submit"
          >
            Login
          </Button>
        </FormGroup>
      </Form>

     { data.loginFormInputs.map((field, key) => (
       document.getElementById(field.name) && document.getElementById(field.name)!== ""  && //If not test fails No DOM elements were found for #email.
        <Tooltip
          key={key}
          placement="left"
          open={hasErrors[field.name].hasError}
          target={`#${field.name}`}
        >
          <span id="input_error"> {hasErrors[field.name].message} </span>
        </Tooltip>
      ))}
    </div>
    
  );
};

export const defaultErrors = {
  email: { hasError: false, message: ""},
  password: { hasError: false, message: "" }
};

export default props => {

  const [user_credentials, setUserCredential] = useState({});
  const [error_message, setErrorMessage] = useState("");
  const [hasErrors, setHasErrors] = useState(defaultErrors);
  const [alertMessage, setAlertMessageFields] = useState({
    visible: false,
    alertType: "danger"
  });
  /**
   * @function dismissAlert
   * @description dismisses the alert message. and closes tool tip.
   */
  const dismissAlert = () => {
    setAlertMessageFields(prev => ({
      ...prev,
      visible: !alertMessage.visible, 
    }));
    setHasErrors(defaultErrors);
  };
  /**
   * Triggers the error alert banner.
   * !!!! Temporary put a success alert for successfull login.
   * @param {String} alertType the alert type success or error.
   */
  const triggerAlert = alertType => {
    setAlertMessageFields({
      visible: !alertMessage.visible, 
      alertType
    });
  };
  /**
   * @function handleResponse
   * @description filters the error type and setting the erro message and form tip error.
   * @param {Object} response the Http response from backend.
   */
  const handleResponse = response => {
    if (response.status === "BAD_REQUEST") {
      const errors = response.errors;
      errors.forEach(error =>
        setHasErrors(prev => ({
          ...prev,
          [error.field]: {
            ...prev[error.field],
            hasError: true,
            message: error.message
          }
        }))
      );
    };

    if (response.status === "BAD_REQUEST" || response.status === "UNAUTHORIZED")
      setAlertMessageFields({ visible: true, alertType: "danger" });

    return setErrorMessage(response.message);
  };
  /**
   * @function handleButtonClick
   * @description Handles the submission, calls the backend API, through login function.
   * handle the response with handleResponse function.
   * @param {Event} event
   */
  const handleButtonClick = async event => {
    event.preventDefault();
    try{
    const response = await login(user_credentials);
    if (!response.token) {
      handleResponse(response);
    } 
    else 
      {
        localStorage.setItem("token", response.token);
        triggerAlert("success"); //temporary TODO: will be redirect to home. this.props.history.push('/dashboard')
        setErrorMessage(response.message); //temporary
      }
    } catch (error){
        throw new Error(error);
    }
  };
  /**
   * @function onChange
   * @description event handling function, handles the changes in the input fields.
   * @param {Event} event
   */
  const onChange = event => {
    const { name, value } = event.target;
    setUserCredential(prev => ({ ...prev, [name]: value }));
    setHasErrors(defaultErrors);
  };
  return (
    <div className="register__container">
      <Alert
        dismissible={dismissAlert}
        open={alertMessage.visible}
        className="mb-3"
        theme={alertMessage.alertType}//theme of type array??? 
      >
        {error_message}
      </Alert>
      <LoginForm handleButtonClick={handleButtonClick} onChange={onChange} hasErrors={hasErrors} />
      <div>
        <h6>
          New to Billsnap?
          <Button
            className="login-link"
            onClick={() => props.setFormType("register")}
          >
            Register an account.
          </Button>
        </h6>
      </div>
      {/* TODO: onChange error handling */}
    </div>
  );
};

LoginForm.propTypes = {
  handleButtonClick: PropType.func.isRequired
};
