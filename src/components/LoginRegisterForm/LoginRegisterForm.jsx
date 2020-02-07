import React from "react";
import { Button, Form, FormGroup, FormInput} from "shards-react";

const LoginRegisterForm = ({formProps}) => {

    // const valid invalid function
    // valid is only for registering
    const validInvalidByName = (name,type) => {
        if(formProps.validInputs){ // only register has valid!! 

            if(formProps.user_credentials[[name]] && formProps.user_credentials[[name]] !== "")
                return (type === "invalid") ? !formProps.validInputs[[name]] : formProps.validInputs[[name]];
            else    
                return false;
        } else 
            return false;
    };
    return(//need prop of valid states based on Name!!!! 
            <div className= {formProps.form_className}>
                <Form>
                    <div className="form-inputs">
                        {(formProps.constants).map((inputs , key) => 
                        <FormGroup key={key} onChange={formProps.onChange}>
                                <FormInput  invalid={validInvalidByName(inputs.name, "invalid")} 
                                            valid={validInvalidByName(inputs.name, "valid")} 
                                            className="mb-2" 
                                            type={inputs.type} 
                                            name={inputs.name} 
                                            id={inputs.name} 
                                            placeholder ={inputs.placeholder} />       
                            </FormGroup>  
                            )
                        }
                    </div>
                        <FormGroup>
                            <Button size="lg" pill theme="dark" onClick= {(event) => formProps.handleButtonClick(event)}  name="submit">{formProps.buttonValue}</Button> 
                        </FormGroup>
                </Form>
            </div>
        );
};

export default(props) => <LoginRegisterForm formProps={props.formProps}/>;