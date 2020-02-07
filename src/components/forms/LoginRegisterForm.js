import React, { PureComponent } from "react";
import { Button, Form, FormGroup, FormInput} from "shards-react";

export class LoginRegisterForm extends PureComponent {

render = () => {
    // const valid invalid function
    // valid is only for registering

    const validInvalidByName = (name,type) => {
        if(this.props.formProps.validInputs){ // only register has valid!! 

            if(this.props.formProps.user_credentials[[name]] && this.props.formProps.user_credentials[[name]] !== "")
                return (type === "invalid") ? !this.props.formProps.validInputs[[name]] : this.props.formProps.validInputs[[name]];
            else    
                return false;
        } else 
            return false;
    };

    return(//need prop of valid states based on Name!!!! 
            <div className= {this.props.formProps.form_className}>
                <Form>
                    <div className="form-inputs">
                        {
                        (this.props.formProps.constants).map((inputs , key) => (
                            <FormGroup key={key} onChange={this.props.formProps.onChange}>
                                <FormInput invalid={validInvalidByName(inputs.name, "invalid")} valid={validInvalidByName(inputs.name, "valid")} className="mb-2" type={inputs.type} name={inputs.name} id={inputs.name} placeholder ={inputs.placeholder} />
                            </FormGroup>  )
                            )
                        }
                    </div>
                   
                        <FormGroup>
                            <Button size="lg" pill theme="dark" onClick= {()=>this.props.formProps.handleButtonClick()}  name="submit">{this.props.formProps.buttonValue}</Button> 
                        </FormGroup>
                    {/* { 
                    this.props.formProps.type === "login" && 
                        <div className="register-account-container"> 
                            <h6> New to Billsnap? 
                                <Button className="login-link" onClick={() => this.props.setFormType("register")}>  Register an account.</Button>
                            </h6>
                        </div>}     */}
                </Form>
            </div>
        );
    };
};

export default LoginRegisterForm;