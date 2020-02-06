import React, { useState } from "react";
import PropType from "prop-types";
import {Tooltip } from "shards-react";
import {registerFormInputs} from "./registerFormConstants";
import LoginRegisterForm from "../forms/LoginRegisterForm";
import {register} from "../../utils/requests/UserRequests";
import "./styles.scss";

export const RegisterForm = ({handleButtonClick ,onChange}) => {
    const formProps = {
        type: "register",
        form_className : "register__form",
        constants : registerFormInputs,
        handleButtonClick,
        onChange,
        buttonValue: "Submit"
    };
    return (
        <LoginRegisterForm formProps = {formProps}/>
    );
};

export default (props) => {
    const [validPassword, setValidPassword] = useState(true); //confirmed password is same
    const [validPasswordFormat, setValidPasswordFormat] = useState(true);
    const [validFirstName, setValidFirstName] = useState(true);
    const [validMiddleName, setValidMiddleName] = useState(true);
    const [validLastName, setValidLastName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);  
    const [user_credentials, setUserCredential] = useState({}); 

    const nameRegex = new RegExp(/^[_A-z]*((-|\s)*[_A-z])*$/);
    const emailRegex = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);
    const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*/); //8 and 20 characters!!! 
    
    const validatePassword = (password, passwordToConfirm) =>  (password === passwordToConfirm);
    
    /**
     * 
     * Object that returns the proper valid input function. 
     * 
     * */
    const getValidationFunction = (name, value) => {
        let validationMap = new Map();
        (name === "firstName") && validationMap.set("firstName",setValidFirstName(nameRegex.test(value)));
        (name === "lastName") && validationMap.set("lastName",setValidLastName(nameRegex.test(value)));
        (name === "email") && validationMap.set("email",setValidEmail(emailRegex.test(value)));
        (name === "password") && validationMap.set("password",setValidPasswordFormat(passwordRegex.test(value)));

        return validationMap.get([name]);
    };
    
    const onChange = event => {
        const {name, value} = event.target;

            if(name !== "confirm_password"){
                getValidationFunction(name,value);
                setUserCredential({...user_credentials, [name] : value});
            }else {
                const {password} = {...user_credentials};
                const confirm_password = value;
                setValidPassword( !validatePassword(password, confirm_password) ? false : true); //if password matchs
            };
    };

    const checkValidity = (boolean_value, checkState, name) =>  (checkState === boolean_value && user_credentials[[name]] && user_credentials[[name]] !== "");

    const handleButtonClick = (e) => {
        //if it exists and true
        ( checkValidity(true,validPassword, "password") && 
            checkValidity(true,validPasswordFormat, "password") && 
            checkValidity(true,validFirstName, "firstName") && 
            checkValidity(true,validLastName, "lastName") && 
            checkValidity(true,validEmail, "email")
        ) ?        
        register(user_credentials).then(response => {
            alert(JSON.stringify(response))
        }) :  alert("form not validated")

        //Call the API... 
    };
  
    const conditions = [
        {
            condition : (checkValidity(false,validPassword, "password")),
            tool_tip_info : {
                open : !validPassword,
                id: "#confirm_password",
                error_message: "Password does not match"
            }
        },{
            condition : (checkValidity(false,validPasswordFormat, "password")),
            tool_tip_info : {
                open : !validPasswordFormat,
                id: "#password",
                error_message: "Invalid password (Must contain at least 1 upper case, lower case, number and symbol, and be between 8-20 characters."
            }
        },{
            condition : (checkValidity(false,validFirstName, "firstName")),
            tool_tip_info : {
                open : !validFirstName,
                id: "#firstName",
                error_message: "Invalid First Name, no numbers."
            }
        },{
            condition : (checkValidity(false,validLastName, "lastName")),
            tool_tip_info : {
                open : !validLastName,
                id: "#lastName",
                error_message: "Invalid Last Name, no numbers."
            }
        },{
            condition : (checkValidity(false,validEmail, "email")),
            tool_tip_info : {
                open : !validEmail,
                id: "#email",
                error_message: "Invalid Email Format."
            }
        }
    ];

    return (
        //Clean this up
    <div className="regForm">
      <RegisterForm handleButtonClick={handleButtonClick} onChange={onChange}/>
        { conditions.map(condition => 
            condition.condition && 
            <Tooltip
                key={condition.tool_tip_info.id}
                open={condition.tool_tip_info.open}
                target={condition.tool_tip_info.id}>
                <span id="input_error">{condition.tool_tip_info.error_message}</span>
            </Tooltip> || null
        )}
    </div>
    );
};

RegisterForm.propTypes = {
    handleButtonClick: PropType.func.isRequired
  };