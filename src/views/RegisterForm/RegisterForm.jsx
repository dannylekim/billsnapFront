import React, { useState } from "react";
import PropType from "prop-types";
import {
  Tooltip,
  Alert,
  Button,
  Form,
  FormGroup,
  FormInput
} from "shards-react";
import registerFormInputs from "./registerFormConstants.json";
import { register } from "../../utils/requests/UserRequests";
import "./styles.scss";

export const RegisterForm = ({
  handleButtonClick,
  onChange,
  validInvalidByName,
  conditions,
  alertNotification,
  dismissAlert,
  setFormType
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
        <div className="hidden__div"></div>
      )}
      <img alt="character logo" src="./billSnapIcon.png" className="character__icon__image"/>

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
            size="sm"
            className="login_register__submit__button"
            pill
            onClick={event => handleButtonClick(event)}
            name="submit"
          >
            Submit
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
          <hr className="form__horizontal__line"></hr>
          Or
          <hr className="form__horizontal__line"></hr>
        </div>
        <div>
          <h6>
            Have an account?
          </h6>
          <Button
            className="form__toggle"
            onClick={setFormType}
          >
            {"👋 Log in to your account."}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const defaultError = {
  isOpen: false,
  alertType: "",
  alertMessage: ""
};

export default props => {
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPasswordFormat, setValidPasswordFormat] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [userCredentials, setUserCredential] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [alertNotification, setAlertNotification] = useState({
    ...defaultError
  });

  const validInputs = {
    firstName: validFirstName,
    lastName: validLastName,
    email: validEmail,
    password: validPasswordFormat,
    confirmPassword: validPassword
  };

  const nameRegex = new RegExp(/^[_A-z]*((-|\s)*[_A-z])*$/);
  const emailRegex = new RegExp(
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const passwordRegex = new RegExp(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).{8,20}/
  );

  /**
   * Boolean function that returns if password matches.
   * @param {String} password user's password
   * @param {String} passwordToConfirm confirmation password.
   */
  const validatePassword = (password, passwordToConfirm) =>
    password === passwordToConfirm;

  /**
   * This function aids the react-shard valid and invalid prop to display the errors.
   * @param {String} name className
   * @param {String} type valid or invalid
   */
  const validInvalidByName = (name, type) => {
    return type === "invalid"
      ? !validInputs[[name]]
      : userCredentials[[name]] && userCredentials[[name]] !== ""
      ? validInputs[[name]]
      : false;
  };
  /**
   * @description Sets the alert or turns it off by calling the setter.
   * @param {String} triggerType - type of trigger success or error.
   */
  const triggerAlert = (triggerType, message) => {
    triggerType === "error"
      ? setAlertNotification({
          isOpen: true,
          alertType: "danger",
          alertMessage: message
        })
      : setAlertNotification({
          isOpen: true,
          alertType: "success",
          alertMessage: message
        });
  };
  /**
   * @description dismiss the alert. Sets the alert states back to default.
   */
  const dismissAlert = () => {
    setAlertNotification(defaultError);
  };
  /**
   * Returns the value of the key given from the map.
   * Map value is the result of the regex.
   * Object that returns the proper valid input function.
   * Lots of if statements.
   * @param {String} name - the input name.
   * @param {String} value - the value of the input field.
   * */
  const getValidationFunction = (name, value) => {
    switch (name) {
      case "firstName":
        return setValidFirstName(nameRegex.test(value));
      case "lastName":
        return setValidLastName(nameRegex.test(value));
      case "email":
        return setValidEmail(emailRegex.test(value));
      case "password":
        return setValidPasswordFormat(passwordRegex.test(value));
      case "confirmPassword":
        const { password } = { ...userCredentials };
        return setValidPassword(validatePassword(password, value));
      default:
        return null;
    }
  };
  /**
   * @description Handles on change events of the form. closes alert
   * @param {Event} event
   */
  const onChange = event => {
    const { name, value } = event.target;
    getValidationFunction(name, value);
    setUserCredential(prev => ({ ...prev, [name]: value }));
    setAlertNotification(defaultError);
  };
  /**
   * @description Check if condition is true or false. Shortcut to writting full condition.
   * @param {Boolean} boolean_value check if true or false.
   * @param {Object} checkState the state to check against.
   * @param {String} name the name of the input field.
   */
  const checkValidity = (boolean_value, checkState, name) => {
    const inputField = userCredentials[[name]];
    return (checkState === boolean_value && inputField && inputField !== "");
  };
  /**
   * @description Handles form submittion and checks validity of inputs.
   * @param {Event} e The event after clicking on the button.
   */
  const handleButtonClick = async e => {
    e.preventDefault();
    if (
      checkValidity(true, validPassword, "confirmPassword") &&
      checkValidity(true, validPasswordFormat, "password") &&
      checkValidity(true, validFirstName, "firstName") &&
      checkValidity(true, validLastName, "lastName") &&
      checkValidity(true, validEmail, "email")
    ) {
      const dataToSend = {
        firstName: userCredentials.firstName,
        lastName: userCredentials.lastName,
        email: userCredentials.email,
        password: userCredentials.password
      };
      try {
        const response = await register(dataToSend);
        if (response.statusCode === 201) props.history.push("/dashboard");
        //if user already exists
        else triggerAlert("error", response.message);
      } catch (error) {
        throw new Error(error);
      }
    } else {
      //blank inputs
      registerFormInputs.forEach(error => {
        if (userCredentials[error.name] === "")
          getValidationFunction(error.name, -1);
      });
      triggerAlert("error", "Form Not Validated"); //handle response
    }
  };
  //list of error messages / information for the Tool Tip component.
  const conditions = [
    {
      name: "confirmPassword",
      condition: checkValidity(false, validPassword, "confirmPassword"),
      toolTipInfo: {
        open: !validPassword,
        errorMessage: !userCredentials.confirmPassword
          ? "Cannot be blank!"
          : "Password does not match"
      }
    },
    {
      name: "password",
      condition: checkValidity(false, validPasswordFormat, "password"),
      toolTipInfo: {
        open: !validPasswordFormat,
        errorMessage: !userCredentials.password
          ? "Cannot be blank!"
          : "Must contain at least 1 upper case, lower case, number and symbol, and be between 8-20 characters."
      }
    },
    {
      name: "firstName",
      condition: checkValidity(false, validFirstName, "firstName"),
      toolTipInfo: {
        open: !validFirstName,
        errorMessage: !userCredentials.firstName
          ? "Cannot be blank!"
          : "No numbers or special characters."
      }
    },
    {
      name: "lastName",
      condition: checkValidity(false, validLastName, "lastName"),
      toolTipInfo: {
        open: !validLastName,
        errorMessage: !userCredentials.lastName
          ? "Cannot be blank!"
          : "No numbers or special characters."
      }
    },
    {
      name: "email",
      condition: checkValidity(false, validEmail, "email"),
      toolTipInfo: {
        open: !validEmail,
        errorMessage: !userCredentials.email
          ? "Cannot be blank!"
          : "Invalid Email Format."
      }
    }
  ];

  return (
      <RegisterForm
        handleButtonClick={handleButtonClick}
        onChange={onChange}
        validInputs={validInputs}
        userCredentials={userCredentials}
        validInvalidByName={validInvalidByName}
        conditions={[...conditions]}
        dismissAlert={dismissAlert}
        alertNotification={alertNotification}
        setFormType = {() => props.setFormType("login")}
      />
  );
};

RegisterForm.propTypes = {
  handleButtonClick: PropType.func.isRequired
};
