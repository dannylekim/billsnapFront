import React, { useState } from "react";
import PropType from "prop-types";
import { Button, Form, FormGroup, FormInput, Tooltip } from "shards-react";
import {registerFormInputs} from "./registerFormConstants";
import "./styles.scss";

export const RegisterForm = ({handleButtonClick ,onChange}) => {
    return (
        <div className="register__form">
            <Form onSubmit={ handleButtonClick }>
                <div className="form-inputs">

                    {registerFormInputs.map((inputs , key) => (
                        <FormGroup key={key} onChange={onChange}>
                            <FormInput type={inputs.type} name={inputs.name} id={inputs.name} placeholder ={inputs.placeholder} />
                        </FormGroup>
                    ))}
                </div>
                    <FormGroup>
                        <Button onClick= {handleButtonClick}  name="submit">Submit </Button> 
                        {/* type='submit' */}
                    </FormGroup>
                </Form>
              
        </div>
    );
};

export default (props) => {
    const [validPassword, setValidPassword] = useState(true); //confirmed password is same
    const [validPasswordFormat, setValidPasswordFormat] = useState(true);
    const [validFirstName, setValidFirstName] = useState(true);
    const [validLastName, setValidLastName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);  
    const [user_credentials, setUserCredential] = useState({}); 

    const nameRegex = new RegExp(/^[_A-z]*((-|\s)*[_A-z])*$/);
    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*/);
    
    const validatePassword = (password, passwordToConfirm) =>  (password === passwordToConfirm);
    
    /**
     * 
     * Object that returns the proper valid input function. 
     * 
     * */
    const getValidationFunction = (name, value) => {
        const validation = {
           "firstName" : setValidFirstName(nameRegex.test(value)),
           "lastName" : setValidLastName(nameRegex.test(value)),
           "email" : setValidEmail(emailRegex.test(value)),
           "password" :    setValidPasswordFormat(passwordRegex.test(value)) 
        };
        return validation[name];
    };
    
    const onChange = event => {
        
        const {name, value} = event.target;

            if(name !== "confirm_password"){
                getValidationFunction(name,value);
                setUserCredential(previousCredential => ({...previousCredential, [name] : value}));
            }else {
                const {password} = {...user_credentials};
                const confirm_password = value;
                setValidPassword( !validatePassword(password, confirm_password) ? false : true); //if password matchs
            };

    };

    const handleButtonClick = (e) => {
        // e.preventDefault()
        //remove confirmPassword
        alert(validFirstName);
        //Call the API... 

        // const email = e.target.email.value;
        // const password = e.target.password.value;
        // const confirm_password = e.target['confirm_password'].value;
  
        // if(!validatePassword(password,confirm_password)) {
        //     console.log("pass did not match");
        //     return setValidPassword(false);
        // }
    }
  
    return (
        //Clean this up
    <div className="regForm">
      <RegisterForm handleButtonClick={handleButtonClick} onChange={onChange}/>
      {/* find a way to map this!!!!  */}
      { (validPassword === false && user_credentials.password !== "") && 
            <Tooltip
                open={!validPassword }
                target="#confirm_password">
                <span id="input_error"> Password does not match</span>
            </Tooltip> ||
        (validPasswordFormat === false && user_credentials.password && user_credentials.password !== "") && 
            <Tooltip
            open={!validPasswordFormat }
            target="#password">
                <span id="input_error"> {`Invalid password (Must contain at least 1 upper case, lower case, number and symbol.`}</span>
            </Tooltip> ||
        (validFirstName === false && user_credentials.firstName && user_credentials.firstName !== "") && 
            <Tooltip
            open={!validFirstName }
            target="#firstName">
                <span id="input_error"> {`Invalid First Name, no numbers.`}</span>
            </Tooltip> ||
        (validLastName === false && user_credentials.lastName && user_credentials.lastName !== "") && 
            <Tooltip
            open={!validLastName }
            target="#lastName">
                <span id="input_error"> {`Invalid Last Name, no numbers.`}</span>
            </Tooltip> ||
        (validEmail === false && user_credentials.email && user_credentials.email !== "") && 
            <Tooltip
            open={!validEmail }
            target="#email">
                <span id="input_error"> {`Invalid Email.`}</span>
            </Tooltip> 
      }
    </div>
    );
};

RegisterForm.propTypes = {
    handleButtonClick: PropType.func.isRequired
  };