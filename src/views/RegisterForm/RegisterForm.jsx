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
        condition => ( condition.condition && 
            <Tooltip
              key={condition.toolTipInfo.id}
              open={condition.toolTipInfo.open}
              target={condition.toolTipInfo.id}
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
  const [validFirstName, setValidFirstName] = useState(true);
  const [validMiddleName, setValidMiddleName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validDOB, setValidDOB] = useState(true); //no future dates
  const [validPhone, setValidPhone] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPasswordFormat, setValidPasswordFormat] = useState(true);
  const [validPassword, setValidPassword] = useState(true); //confirmed password is same
  const [validLocation, setValidLocation] = useState(true);
  const [userCredentials, setUserCredential] = useState({});
  const [alertNotification, setAlertNotification] = useState({
    isOpen: false,
    alertType: "",
    alertMessage: ""
  });

  const validInputs = {
    firstName: validFirstName,
    middleName: validMiddleName,
    lastName: validLastName,
    birthDate: validDOB,
    email: validEmail,
    phoneNumber: validPhone,
    password: validPasswordFormat,
    confirmPassword: validPassword,
    location: validLocation
  };

  const nameRegex = new RegExp(/^[_A-z]*((-|\s)*[_A-z])*$/);
  const phoneRegex = RegExp(/^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s']?[0-9]{4}$/);
  const emailRegex = new RegExp(/[\w-.]+@([\w-]+.)+[\w-]{2,4}/);
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
    if (userCredentials[[name]] && userCredentials[[name]] !== "")
      return type === "invalid" ? !validInputs[[name]] : validInputs[[name]];
    else return false;
  };

  /**
   * Sets the alert or turns it off by calling the setter.
   * @param {String} triggerType - type of trigger success or error.
   */
  const triggerAlert = triggerType => {
    triggerType === "error"
      ? setAlertNotification({
          isOpen: !alertNotification.isOpen,
          alertType: "danger",
          alertMessage: "Form Not Validated"
        })
      : setAlertNotification({
          isOpen: !alertNotification.isOpen,
          alertType: "success",
          alertMessage: "Registration Successful!"
        });
  };
  /**
   * Returns the value of the key given from the map.
   * Map value is the result of the regex.
   * Object that returns the proper valid input function.
   * Lots of if statements.
   * @param {String} name - the input name.
   * @param {String} value - the value of the input field.
   *
   * */
  const getValidationFunction = (name, value) => {
    switch(name){
      case "firstName":
        return setValidFirstName(nameRegex.test(value));
      case "middleName":
        return setValidMiddleName(nameRegex.test(value));
      case "lastName":
        return setValidLastName(nameRegex.test(value));
      case "phoneNumber":
        return setValidPhone(phoneRegex.test(value));
      case "email":
        return setValidEmail(emailRegex.test(value));
      case "password":
        return setValidPasswordFormat(passwordRegex.test(value));
      case "location":
          return setValidLocation(nameRegex.test(value));
      case "birthDate":
            return setValidDOB(new Date(value.split("-")[0],parseInt(value.split("-")[1]) - 1,value.split("-")[2]) <= new Date());
      default:
        return null;
    };
  };

  /**
   * Handles on change events of the form.
   * @param {Event} event
   */
  const onChange = event => {
    const { name, value } = event.target;
    switch(name) {
    case "confirmPassword":
      const { password } = { ...userCredentials };
      const confirmPassword = value;
      setValidPassword(validatePassword(password, confirmPassword)); //if password matchs
      break;
    default:
      getValidationFunction(name, value);
      setUserCredential((prev) => ({ ...prev, [name]: value }));
      break;
    };
  };

  /**
   * Check if condition is true or false. Shortcut to writting full condition.
   * @param {Boolean} boolean_value check if true or false.
   * @param {Object} checkState the state to check against.
   * @param {String} name the name of the input field.
   */
  const checkValidity = (boolean_value, checkState, name) =>
    checkState === boolean_value &&
    userCredentials[[name]] &&
    userCredentials[[name]] !== "";

  /**
   * Handles form submittion and checks validity of inputs.
   * @param {Event} e The event after clicking on the button.
   */
  const handleButtonClick = e => {
    e.preventDefault();

    checkValidity(true, validPassword, "password") &&
    checkValidity(true, validPasswordFormat, "password") &&
    checkValidity(true, validFirstName, "firstName") &&
    checkValidity(true, validLastName, "lastName") &&
    checkValidity(true, validEmail, "email") &&
    checkValidity(true, validPhone, "phoneNumber")
      ? register(userCredentials).then(response => {
          triggerAlert("success"); //TODO should redirect this.props.history.push("/dashboard");!!!
        })
      : triggerAlert("error");
  };

  //list of error messages / information for the Tool Tip component. 
  const conditions = [
    {
      condition: checkValidity(false, validPassword, "password"),
      toolTipInfo: {
        open: !validPassword,
        id: "#confirmPassword",
        errorMessage: "Password does not match"
      }
    },
    {
      condition: checkValidity(false, validPasswordFormat, "password"),
      toolTipInfo: {
        open: !validPasswordFormat,
        id: "#password",
        errorMessage:
          "Invalid password (Must contain at least 1 upper case, lower case, number and symbol, and be between 8-20 characters."
      }
    },
    {
      condition: checkValidity(false, validFirstName, "firstName"),
      toolTipInfo: {
        open: !validFirstName,
        id: "#firstName",
        errorMessage: "Invalid First Name, no numbers or special characters."
      }
    },
    {
      condition: checkValidity(false, validMiddleName, "middleName"),
      toolTipInfo: {
        open: !validMiddleName,
        id: "#middleName",
        errorMessage: "Invalid Middle Name, no numbers or special characters."
      }
    },
    {
      condition: checkValidity(false, validLastName, "lastName"),
      toolTipInfo: {
        open: !validLastName,
        id: "#lastName",
        errorMessage: "Invalid Last Name, no numbers or special characters."
      }
    },
    {
      condition: checkValidity(false, validDOB, "birthDate"),
      toolTipInfo: {
        open: !validDOB,
        id: "#birthDate",
        errorMessage: "Can't be born in a future date."
      }
    },
    {
      condition: checkValidity(false, validPhone, "phoneNumber"),
      toolTipInfo: {
        open: !validPhone,
        id: "#phoneNumber",
        errorMessage:
          "Must be 10 digit numbers (xxx) xxx xxxx (can be seperated by - or space)."
      }
    },
    {
      condition: checkValidity(false, validEmail, "email"),
      toolTipInfo: {
        open: !validEmail,
        id: "#email",
        errorMessage: "Invalid Email Format."
      }
    }
  ];

  return (
    <div className="register__container">
      <Alert
        dismissible={triggerAlert}
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
        conditions={conditions}
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
