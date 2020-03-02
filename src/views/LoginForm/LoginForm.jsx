import React, { useState } from "react";
import PropType from "prop-types";
import loginFormInputs from "./loginFormConstants.json";
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

export const LoginForm = ({ handleButtonClick, onChange, hasErrors,alertMessage,dismissAlert,error_message,setFormType}) => {
  return (
    <div>
      <div className="login__form">

      {alertMessage.visible === true ? (
          <Alert
            dismissible={dismissAlert}
            open={alertMessage.visible}
            className="mb-3"
            theme={alertMessage.alertType} 
          >
            {error_message}
          </Alert>
        ) : (
          <div className="hidden__div"></div>
        )}

        <Form>
          <div className="form__inputs">
            {loginFormInputs.map((inputs, key) => (
              <FormGroup key={key} onChange={onChange}>
                <FormInput
                  className="mb-2"
                  type={inputs.type}
                  name={inputs.name}
                  id={inputs.name}
                  placeholder={inputs.placeholder}
                  autoComplete={inputs.autoComplete}
                  invalid={hasErrors[inputs.name].hasError}
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

        {loginFormInputs.map(
          (field, key) =>
        (    <Tooltip
                key={key}
                placement="left"
                open={hasErrors[field.name].hasError}
                target={`#${field.name}`}
              >
                <span id="input_error"> {hasErrors[field.name].message} </span>
              </Tooltip>
            )
        )}
      </div>

      <div>
        <h6>
          New to Billsnap?
          <Button
            className="form__toggle"
            onClick={setFormType}
          >
            Register an account.
          </Button>
        </h6>
      </div>
   </div>
  );
};

export const defaultErrors = {
  email: { hasError: false, message: "" },
  password: { hasError: false, message: "" }
};

export const defaultAlertMessage = {
  visible: false,
  alertType: "danger"
};

export default props => {
  const [user_credentials, setUserCredential] = useState({"email": "", 
                                                          "password": ""});
  const [error_message, setErrorMessage] = useState("");
  const [hasErrors, setHasErrors] = useState(defaultErrors);
  const [alertMessage, setAlertMessageFields] = useState(defaultAlertMessage);
  /**
   * @function dismissAlert
   * @description dismisses the alert message. and closes tool tip.
   */
  const dismissAlert = () => {
    setAlertMessageFields(prev => ({
      ...prev,
      visible: false
    }));
    setHasErrors(defaultErrors);
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
    }

    if(response.status === "UNAUTHORIZED"){
      setHasErrors({
        email: { hasError: true, message: "email might not exist in system." },
        password: { hasError: true, message: "forgot your password?" }
      })
    }

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
    try {
      const response = await login(user_credentials);
      if (!response.token) {
        handleResponse(response);
      } else {
        localStorage.setItem("token", response.token);
        props.history.push("/dashboard");
      }
    } catch (error) {
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
    <div className="login__container">
      <LoginForm
        handleButtonClick={handleButtonClick}
        onChange={onChange}
        hasErrors={hasErrors}
        user_credentials={user_credentials}
        alertMessage={alertMessage}
        dismissAlert={dismissAlert}
        error_message={error_message} 
        setFormType = {() => props.setFormType("register")}
      />
    </div>
  );
};

LoginForm.propTypes = {
  handleButtonClick: PropType.func.isRequired
};
