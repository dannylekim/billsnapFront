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
import * as data from "./registerFormConstants.json";
import { register } from "../../utils/requests/UserRequests";
import "./styles.scss";

export const RegisterForm = ({
  handleButtonClick,
  onChange,
  validInvalidByName,
  conditions
}) => {
  return (
    <Form>
      <div className="form-inputs">
        {data.registerFormInputs.map((inputs, key) => (
          <FormGroup key={key} onChange={onChange}>
            <FormInput
              invalid={validInvalidByName(inputs.name, "invalid")}
              valid={validInvalidByName(inputs.name, "valid")}
              className="mb-2"
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
          size="lg"
          pill
          theme="dark"
          onClick={event => handleButtonClick(event)}
          name="submit"
        >
          Submit
        </Button>
      </FormGroup>

      {conditions.map(
        condition => //document.getElement so that tests pass else DOM not found for id ... 
          ((condition.condition || condition.condition === false) && (document.getElementById(condition.name) && document.getElementById(condition.name)!== "")) && (
            <Tooltip
              placement="left"
              key={`#${condition.name}`}
              open={condition.toolTipInfo.open}
              target={`#${condition.name}`}
            >
              <span id="input_error">{condition.toolTipInfo.errorMessage}</span>
            </Tooltip>
          )
      )}
    </Form>
  );
};

export default props => {
  //validInputs
  const defaultError = {
    isOpen: false,
    alertType: "",
    alertMessage: ""
  };
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPasswordFormat, setValidPasswordFormat] = useState(true);
  const [validPassword, setValidPassword] = useState(true); //confirmed password is same
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
  const emailRegex = new RegExp(/[\w-.]+@([\w-]+).+[\w-]{2,4}/); //wrong!!!
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
   * Won't change the color of confirm password, since confirmPassword isn't part of user credential.
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
   * document.getElementById is used when the form is already submitted but an error happened.
   * Since the confirmPassword is removed, it will no longer be in the userCredentials.
   * @param {Boolean} boolean_value check if true or false.
   * @param {Object} checkState the state to check against.
   * @param {String} name the name of the input field.
   */
  const checkValidity = (boolean_value, checkState, name) => {
    const inputField =
      name === "confirmPassword"
        ? document.getElementById("confirmPassword")
        : userCredentials[[name]];
    if (checkState === boolean_value && inputField && inputField !== "")
      return true;
    else {
      return false;
    }
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
      delete userCredentials["confirmPassword"]; //remove confirm password
      const response = await register(userCredentials);
      if (response.statusCode === 201)
        triggerAlert("success", "Registration Successful!");
      //TODO should redirect this.props.history.push("/dashboard");!!!
      //if user already exists
      else triggerAlert("error", response.message);
    } else {//blank inputs
      data.registerFormInputs.forEach(error => {
        if (userCredentials[error.name] === "")
          getValidationFunction(error.name, -1);
      });
      triggerAlert("error", "Form Not Validated"); //handle response
    }
  };
  //list of error messages / information for the Tool Tip component.
  const conditions = [
    {
      name:"confirmPassword",
      condition: checkValidity(false, validPassword, "confirmPassword"),
      toolTipInfo: {
        open: !validPassword,
        errorMessage: !userCredentials.confirmPassword
          ? "Cannot be blank!"
          : "Password does not match"
      }
    },
    {
      name:"password",
      condition: checkValidity(false, validPasswordFormat, "password"),
      toolTipInfo: {
        open: !validPasswordFormat,
        errorMessage: !userCredentials.password
          ? "Cannot be blank!"
          : "Must contain at least 1 upper case, lower case, number and symbol, and be between 8-20 characters."
      }
    },
    {
      name:"firstName",
      condition: checkValidity(false, validFirstName, "firstName"),
      toolTipInfo: {
        open: !validFirstName,
        errorMessage: !userCredentials.firstName
          ? "Cannot be blank!"
          : "No numbers or special characters."
      }
    },
    {
      name:"lastName",
      condition: checkValidity(false, validLastName, "lastName"),
      toolTipInfo: {
        open: !validLastName,
        errorMessage: !userCredentials.lastName
          ? "Cannot be blank!"
          : "No numbers or special characters."
      }
    },
    {
      name:"email",
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
    <div className="register__container">
      <Alert
        dismissible={dismissAlert}
        open={alertNotification.isOpen}
        className="mb-3"
        theme={alertNotification.alertType}
      >
        {alertNotification.alertMessage}
      </Alert>

      <RegisterForm
        handleButtonClick={handleButtonClick}
        onChange={onChange}
        validInputs={validInputs}
        userCredentials={userCredentials}
        validInvalidByName={validInvalidByName}
        conditions={[...conditions]}
      />
      <div>
        <h6>
          Have an account?
          <Button
            className="login-link"
            onClick={() => props.setFormType("login")}
          >
            Login to your account.
          </Button>
        </h6>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  handleButtonClick: PropType.func.isRequired
};
