import React, {useState} from "react";
import PropType from "prop-types";
import loginFormInputs from "./loginFormConstants.json";
import {login} from "../../utils/requests/UserRequests";
import {Alert, Button, Form, FormGroup, FormInput, Tooltip,} from "shards-react";
import "./styles.scss";

export const LoginForm = ({
                            handleButtonClick,
                            onChange,
                            hasErrors,
                            alertMessage,
                            dismissAlert,
                            error_message,
                            setFormType,
                          }) => {
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

          <img
              alt="character logo"
              src="./billSnapIcon.png"
              className="character__icon__image"
          />

          <Form>
            <div className="form__inputs">
              {loginFormInputs.map((inputs, key) => (
                  <FormGroup key={key} onChange={onChange}>
                    <FormInput
                        className="register__login__inputs"
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
            <div className="forgot__password__login">
              <a href="/#" className="forgot__password">
                Forgot Password?
              </a>

              <Button
                  size="md"
                  pill
                  className="login_register__submit__button"
                  onClick={(event) => handleButtonClick(event)}
                  name="submit"
              >
                Log in
              </Button>
            </div>
          </Form>

          {loginFormInputs.map((field, key) => (
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

      <div>
        <div className="form__seperator">
          <hr className="form__horizontal__line"></hr>
          Or
          <hr className="form__horizontal__line"></hr>
        </div>
        <div>
          <h6>New to Billsnap?</h6>
          <Button className="form__toggle" onClick={setFormType}>
            {"👋 Create account"}
          </Button>
        </div>
      </div>
      </div>
  );
};

export const defaultErrors = {
  email: {hasError: false, message: ""},
  password: {hasError: false, message: ""},
};

export const defaultAlertMessage = {
  visible: false,
  alertType: "danger",
};

export default (props) => {
  const [user_credentials, setUserCredential] = useState({
    email: "",
    password: "",
  });
  const [error_message, setErrorMessage] = useState("");
  const [hasErrors, setHasErrors] = useState(defaultErrors);
  const [alertMessage, setAlertMessageFields] = useState(defaultAlertMessage);
  /**
   * @function dismissAlert
   * @description dismisses the alert message. and closes tool tip.
   */
  const dismissAlert = () => {
    setAlertMessageFields((prev) => ({
      ...prev,
      visible: false,
    }));
    setHasErrors(defaultErrors);
  };

  /**
   * @function handleResponse
   * @description filters the error type and setting the erro message and form tip error.
   * @param {Object} response the Http response from backend.
   */
  const handleResponse = (response) => {
    if (response.status === "BAD_REQUEST") {
      const errors = response.errors;
      errors.forEach((error) =>
          setHasErrors((prev) => ({
            ...prev,
            [error.field]: {
              ...prev[error.field],
              hasError: true,
              message: error.message,
            },
          }))
      );
    }

    if (response.status === "UNAUTHORIZED") {
      setHasErrors({
        email: {hasError: true, message: "email might not exist in system."},
        password: {hasError: true, message: "forgot your password?"},
      });
    }

    if (response.status === "BAD_REQUEST" || response.status === "UNAUTHORIZED")
      setAlertMessageFields({visible: true, alertType: "danger"});

    return setErrorMessage(response.message);
  };
  /**
   * @function handleButtonClick
   * @description Handles the submission, calls the backend API, through login function.
   * handle the response with handleResponse function.
   * @param {Event} event
   */
  const handleButtonClick = async (event) => {
    event.preventDefault();
    try {
      const response = await login(user_credentials);
      if (!response.token) {
        handleResponse(response);
      } else {
        localStorage.setItem("billSnap_token", response.token);
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
  const onChange = (event) => {
    const {name, value} = event.target;
    setUserCredential((prev) => ({...prev, [name]: value}));
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
          setFormType={() => props.setFormType("register")}
      />
    </div>
  );
};

LoginForm.propTypes = {
  handleButtonClick: PropType.func.isRequired,
};
