import React, {Component} from "react";
import PropType from "prop-types";
import {Alert, Button, Form, FormGroup, FormInput, Tooltip,} from "shards-react";
import Loader from "../../components/Loader";

import registerFormInputs from "./registerFormConstants.json";
import {login, register} from "../../utils/requests/UserRequests";

import "./styles.scss";

export const RegisterForm = ({
  handleButtonClick,
  onChange,
  validInvalidByName,
  conditions,
  alertNotification,
  dismissAlert,
  setFormType,
}) => {
  return (
    <div className="register__container">
      {alertNotification.isOpen === true ? (
          <Alert
              dismissible={dismissAlert}
              open={alertNotification.isOpen}
              className="mb-3"
              theme={alertNotification.alertType}
          >
              {alertNotification.alertMessage}
          </Alert>
      ) : (
          <div className="hidden__div"/>
      )}
      <img
        alt="character logo"
        src="./billSnapIcon.png"
        className="character__icon__image"
      />

      <Form>
        <div className="form__inputs">
          {registerFormInputs.map((inputs, key) => (
            <FormGroup key={key} onChange={onChange}>
              <FormInput
                invalid={validInvalidByName(inputs.name, "invalid")}
                valid={validInvalidByName(inputs.name, "valid")}
                className="register__login__inputs"
                type={inputs.type}
                name={inputs.name}
                id={inputs.name}
                placeholder={inputs.placeholder}
                autoComplete={inputs.autoComplete}
              />
            </FormGroup>
          ))}
        </div>
        <FormGroup>
          <Button
            size="md"
            className="login_register__submit__button"
            pill
            onClick={handleButtonClick}
            name="submit"
          >
            Sign Up
          </Button>
        </FormGroup>

        {conditions.map((condition, key) => (
          <Tooltip
            placement="left"
            key={key}
            open={condition.toolTipInfo.open}
            target={`#${condition.name}`}
          >
            <span id="input__error">{condition.toolTipInfo.errorMessage}</span>
          </Tooltip>
        ))}
      </Form>

      <div>
        <div className="form__seperator">
            <hr className="form__horizontal__line"/>
          Or
            <hr className="form__horizontal__line"/>
        </div>
        <div>
          <h6>Have an account?</h6>
          <Button className="form__toggle" onClick={setFormType}>
            {"👋 Log in to your account"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const DEFAULT_ERRORS = {
  isOpen: false,
  alertType: "",
  alertMessage: "",
};

const NAME_REGEX = new RegExp(/^[_A-z]*((-|\s)*[_A-z])*$/);
const EMAIL_REGEX = new RegExp(
    /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const PASSWORD_REGEX = new RegExp(
  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).{8,20}/
);

class RegisterFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCredentials: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validFields: {
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        passwordFormat: true,
      },
      alertNotification: DEFAULT_ERRORS,
      isLoading: false,
    };

    this.validInvalidByName = this.validInvalidByName.bind(this);
    this.triggerAlert = this.triggerAlert.bind(this);
    this.dismissAlert = this.dismissAlert.bind(this);
    this.validateField = this.validateField.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  /**
   * Boolean function that returns if password matches.
   * @param {String} password user's password
   * @param {String} passwordToConfirm confirmation password.
   */
  static validatePassword = (password, passwordToConfirm) =>
    password === passwordToConfirm;

  /**
   * This function aids the react-shard valid and invalid prop to display the errors.
   * @param {String} name className
   * @param {String} type valid or invalid
   */
  validInvalidByName = (name, type) => {
      return (
          (type === "invalid"
              ? !this.state.validFields[name]
              : this.state.validFields[name]) &&
          this.state.userCredentials[name] !== "" &&
          this.state.validFields[name]
      );
  };

    /**
     * @description Sets the alert or turns it off by calling the setter.
     * @param {String} triggerType - type of trigger success or error.
     * @param message message to display
     */
    triggerAlert = (triggerType, message) => {
        const alertNotification =
            triggerType === "error"
                ? {
                    isOpen: true,
                    alertType: "danger",
                    alertMessage: message,
                }
                : {
                    isOpen: true,
                    alertType: "success",
                    alertMessage: message,
                };
        return this.setState({
            alertNotification,
        });
    };

    /**
     * @description dismiss the alert. Sets the alert states back to default.
     */
    dismissAlert = () => {
        return this.setState({
            alertNotification: DEFAULT_ERRORS,
        });
    };

    /**
     * Returns the value of the key given from the map.
     * Map value is the result of the regex.
   * Object that returns the proper valid input function.
   * Lots of if statements.
   * @param {String} name - the input name.
   * @param {String} value - the value of the input field.
   * */
  validateField = (name, value) => {
    const result = {};
    switch (name) {
      case "firstName":
        result.firstName = NAME_REGEX.test(value);
        break;
      case "lastName":
        result.lastName = NAME_REGEX.test(value);
        break;
      case "email":
        result.email = EMAIL_REGEX.test(value);
          break;
        case "password":
            result.passwordFormat = PASSWORD_REGEX.test(value);
            break;
        case "confirmPassword":
            const {password} = this.state.userCredentials;
            const passwordMatches = this.constructor.validatePassword(
                password,
                value
            );
            result.password = passwordMatches;
            this.setState((prev) => ({
                userCredentials: {
                    ...prev.userCredentials,
                    confirmPassword: true,
                },
            }));
            break;
        default:
            break;
    }

      return this.setState((prev) => ({
          validFields: {
              ...prev.validFields,
              ...result,
          },
      }));
  };

  /**
   * @description Handles on change events of the form. closes alert
   * @param {Event} event
   */
  onFormChange = (event) => {
    const { name, value } = event.target;

    this.validateField(name, value);

    this.setState((prev) => ({
      userCredentials: {
        ...prev.userCredentials,
        [name]: value,
      },
    }));
    return this.dismissAlert();
  };

  /**
   * @description Check if condition is true or false. Shortcut to writting full condition.
   * @param {Object} checkState the state to check against.
   * @param {String} name the name of the input field.
   */
  checkValidity = (checkState, name) => {
    const inputField = this.state.userCredentials[name];
    return checkState && inputField && inputField !== "";
  };

  /**
   * @description Handles form submittion and checks validity of inputs.
   * @param {Event} e The event after clicking on the button.
   */
  handleSubmitClick = async (e) => {
    e.preventDefault();
    this.setState({
        isLoading: true,
    });
    if (
      this.checkValidity(this.state.validFields.password, "confirmPassword") &&
      this.checkValidity(this.state.validFields.passwordFormat, "password") &&
      this.checkValidity(this.state.validFields.firstName, "firstName") &&
      this.checkValidity(this.state.validFields.lastName, "lastName") &&
      this.checkValidity(this.state.validFields.email, "email")
    ) {
      const { firstName, lastName, email, password } = {
        ...this.state.userCredentials,
      };

      const dataToSend = {
        firstName,
        lastName,
        email,
        password,
      };

      try {
        const response = await register(dataToSend);
        if (response.statusCode === 201) {
            const loginInfo = {
                email,
                password,
            };
            const {token, profile} = await login(loginInfo);

            if (token) {
                localStorage.setItem("billSnap_token", token);
                const {id, ...userProfile} = profile;
                this.props.setUser(userProfile);
                this.props.history.push("/dashboard");
            } else {
                this.triggerAlert(
                    "error",
                    "'Account created, but failed to log in. Please try logging in with your credentials"
                );
            }
        } else {
          this.triggerAlert("error", response.message);
        }
        //if user already exists
      } catch (error) {
        this.triggerAlert("error", error.message);
      }
    } else {
      //blank inputs
      registerFormInputs.forEach((error) => {
        if (this.state.userCredentials[error.name] === "") {
          this.validateField(error.name, -1);
        }
      });
      this.triggerAlert("error", "Form Not Validated"); //handle response
    }

    this.setState({
        isLoading: false,
    });
  };

  render() {
    const { userCredentials, validFields, alertNotification } = this.state;

    const {
      firstName,
      lastName,
      email,
      password,
      passwordFormat,
    } = validFields;

    //list of error messages / information for the Tool Tip component.
    const conditions = [
      {
        name: "confirmPassword",
        toolTipInfo: {
          open: !password,
          errorMessage: !userCredentials.confirmPassword
            ? "Cannot be blank!"
            : "Password does not match",
        },
      },
      {
        name: "password",
        toolTipInfo: {
          open: !passwordFormat,
          errorMessage: !userCredentials.password
            ? "Cannot be blank!"
            : "Must contain at least 1 upper case, lower case, number and symbol, and be between 8-20 characters.",
        },
      },
      {
        name: "firstName",
        toolTipInfo: {
          open: !firstName,
          errorMessage: !userCredentials.firstName
            ? "Cannot be blank!"
            : "No numbers or special characters.",
        },
      },
      {
        name: "lastName",
        toolTipInfo: {
          open: !lastName,
          errorMessage: !userCredentials.lastName
            ? "Cannot be blank!"
            : "No numbers or special characters.",
        },
      },
      {
        name: "email",
        toolTipInfo: {
          open: !email,
          errorMessage: !userCredentials.email
            ? "Cannot be blank!"
            : "Invalid Email Format.",
        },
      },
    ];

    return (
      <div className="register__container">
        {this.state.isLoading && <Loader />}
        <RegisterForm
          handleButtonClick={this.handleSubmitClick}
          onChange={this.onFormChange}
          userCredentials={userCredentials}
          validInvalidByName={this.validInvalidByName}
          conditions={conditions}
          dismissAlert={this.dismissAlert}
          alertNotification={alertNotification}
          setFormType={this.props.setFormType("login")}
        />
      </div>
    );
  }
}

RegisterFormContainer.propTypes = {
  setFormType: PropType.func.isRequired,
};

RegisterForm.propTypes = {
    handleButtonClick: PropType.func.isRequired,
    onChange: PropType.func.isRequired,
    validInvalidByName: PropType.func.isRequired,
    conditions: PropType.arrayOf(PropType.shape({})),
    alertNotification: PropType.shape({}),
    dismissAlert: PropType.func.isRequired,
    setFormType: PropType.func.isRequired,
};

export default RegisterFormContainer;
