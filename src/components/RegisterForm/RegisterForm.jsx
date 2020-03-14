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
    const [validPassword, setValidPassword] = useState(true); 
    const [validPasswordFormat, setValidPasswordFormat] = useState(true);  
    const [user_credentials, setUserCredential] = useState({}); 
    const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*/);
    
    const validatePassword = (password, passwordToConfirm) =>  (password === passwordToConfirm);
    
    //object that checks for valid inputs 

    const onChange = async event => {
        //set invalid password format
        const {name, value} = event.target;
      
            if(name !== "confirm_password"){
                if(name === "password"){
                    await setValidPasswordFormat(passwordRegex.test(value)); //
                    
                }
                await setUserCredential({...user_credentials, [name] : value});
            }else {
                const {password} = {...user_credentials};
                const confirm_password = value;
                await setValidPassword(await !validatePassword(password, confirm_password) ? false : true);
            };

    };

    const handleButtonClick = (e) => {
        // e.preventDefault()
        //remove confirmPassword
        alert(validPasswordFormat);
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
    <div className="regForm">
      <RegisterForm handleButtonClick={handleButtonClick} onChange={onChange}/>
      {/* find a way to map this!!!!  */}
      { (validPassword === false && user_credentials.password !== "") && 
            <Tooltip
                open={!validPassword }
                target="#confirm_password">
            <span id="input_error"> Password does not match</span>
            </Tooltip> ||
        validPasswordFormat === false && user_credentials.password !== "" && 
            <Tooltip
            open={!validPasswordFormat }
            target="#password">
                <span id="input_error"> {`Invalid password (Must contain at least 1 upper case, lower case, number and symbol.`}</span>
         </Tooltip>
      
      }
    </div>
    );
};

RegisterForm.propTypes = {
    handleButtonClick: PropType.func.isRequired
  };