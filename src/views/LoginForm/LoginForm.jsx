import React, {Component} from "react";
import PropType from "prop-types";
import loginFormInputs from "./loginFormConstants.json";
import {login} from "../../utils/requests/UserRequests";
import {Alert, Button, Form, FormGroup, FormInput, Tooltip,} from "shards-react";
import Loader from "../../components/Loader";

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
        <div className="hidden__div" />
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
            onClick={handleButtonClick}
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

      <div>
        <div className="form__seperator">
          <hr className="form__horizontal__line" />
          Or
          <hr className="form__horizontal__line" />
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

export const DEFAULT_ERRORS = {
  email: { hasError: false, message: "" },
  password: { hasError: false, message: "" },
};

export const DEFAULT_ALERT_MESSAGE = {
  visible: false,
  alertType: "danger",
};

class LoginFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_credentials: {
        email: "",
        password: "",
      },
      error_message: "",
      hasErrors: DEFAULT_ERRORS,
      alertMessage: DEFAULT_ALERT_MESSAGE,
      isLoading: false,
    };

    this.dismissAlert = this.dismissAlert.bind(this);
    this.handleErrorResponse = this.handleErrorResponse.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }

  /**
   * @function dismissAlert
   * @description dismisses the alert message. and closes tool tip.
   */
  dismissAlert = () => {
    this.setState((prev) => ({
      alertMessage: {
        ...prev.alertMessage,
        visible: false,
      },
      hasErrors: DEFAULT_ERRORS,
    }));
  };

  /**
   * @function handleResponse
   * @description filters the error type and setting the erro message and form tip error.
   * @param {Object} response the Http response from backend.
   */
  handleErrorResponse = (response) => {
    if (response.status === "BAD_REQUEST") {
      response.errors.forEach((error) =>
        this.setState((prev) => ({
          hasErrors: {
            ...prev.hasErrors,
            [error.field]: {
              hasError: true,
              message: error.message,
            },
          },
        }))
      );
    }

    if (response.status === "UNAUTHORIZED") {
      this.setState({
        hasErrors: {
          email: {
            hasError: true,
            message: "email might not exist in system.",
          },
          password: { hasError: true, message: "forgot your password?" },
        },
      });
    }

    if (
      response.status === "BAD_REQUEST" ||
      response.status === "UNAUTHORIZED"
    ) {
      this.setState({
        alertMessage: { visible: true, alertType: "danger" },
      });
    }

    return this.setState({
      error_message: response.message,
    });
  };

  /**
   * @function handleSubmitClick
   * @description Handles the submission, calls the backend API, through login function.
   * handle the response with handleResponse function.
   * @param {Event} event
   */
  handleSubmitClick = async (event) => {
    event.preventDefault();
    this.dismissAlert();
    try {
      this.setState({
        isLoading: true,
      });
      const response = await login(this.state.user_credentials);
      if (!response.token) {
        this.handleErrorResponse(response);
      } else {
        localStorage.setItem("billSnap_token", response.token);
        const { id, ...userProfile } = response.profile;
        this.props.setUser(userProfile);
        this.props.history.push("/dashboard");
      }
    } catch (error) {
      this.handleErrorResponse(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  /**
   * @function onFormChange
   * @description event handling function, handles the changes in the input fields.
   * @param {Event} event
   */
  onFormChange = (event) => {
    const { name, value } = event.target;
    this.setState((prev) => ({
      user_credentials: {
        ...prev.user_credentials,
        [name]: value,
      },
      hasError: DEFAULT_ERRORS,
    }));
  };

  render() {
    const {
      hasErrors,
      user_credentials,
      alertMessage,
      error_message,
    } = this.state;

    return (
      <div className="login__container">
        {this.state.isLoading && <Loader />}
        <LoginForm
          handleButtonClick={this.handleSubmitClick}
          onChange={this.onFormChange}
          hasErrors={hasErrors}
          user_credentials={user_credentials}
          alertMessage={alertMessage}
          dismissAlert={this.dismissAlert}
          error_message={error_message}
          setFormType={this.props.setFormType("register")}
        />
      </div>
    );
  }
}

LoginFormContainer.propTypes = {
  setFormType: PropType.func.isRequired,
};

export default LoginFormContainer;
