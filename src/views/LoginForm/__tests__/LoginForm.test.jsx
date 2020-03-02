import React from 'react';
import {LoginForm , defaultErrors,defaultAlertMessage } from '../LoginForm.jsx';
import { shallow } from "enzyme";

describe('LoginForm', () => {
    let wrapper;
    let handleMockFunction;
  
    beforeEach(() => {
      handleMockFunction = jest.fn();
      wrapper = shallow(
        <LoginForm setFormType = {handleMockFunction} handleButtonClick={handleMockFunction} hasErrors={defaultErrors} alertMessage={defaultAlertMessage} error_message = "" dismissAlert={handleMockFunction}/>
      );
    });
  
    afterEach(() => {
      handleMockFunction.mockRestore();
    });
  
    describe("render", () => {
      describe("snapshots 📸", () => {
        it("Login should match snap shot", () => {
          const emailToolTip = document.createElement('div');
          const passwordToolTip = document.createElement('div');
          
          emailToolTip.setAttribute("id", "email");
          document.body.appendChild(emailToolTip)
          passwordToolTip.setAttribute("id", "password");
          document.body.appendChild(passwordToolTip)

          matches(
          <LoginForm setFormType = {handleMockFunction} handleButtonClick={handleMockFunction} hasErrors={defaultErrors} alertMessage={defaultAlertMessage} error_message = "" dismissAlert={handleMockFunction}/>);
        });
      });

      describe("components", () => {
        describe("ToolTip closed", () => {
          it("Should have no Errors ToolTip is closed", () => {

            expect(wrapper.find('Alert')).toHaveLength(0);
            expect(wrapper.find('FormInput')).toHaveLength(2);
            expect(wrapper.find('FormInput').at(0).prop('invalid')).toBeFalsy();
            expect(wrapper.find('FormInput').at(1).prop('invalid')).toBeFalsy();

            expect(wrapper.find('Tooltip')).toHaveLength(2);
            expect(wrapper.find('Tooltip').at(0).prop('open')).toBeFalsy();
            expect(wrapper.find('Tooltip').at(1).prop('open')).toBeFalsy();
          });
        });
  
        describe("ToolTip opened", () => {
          it("Should have error, ToolTip is opened", () => {
            const error = {
              email: { hasError: true, message: "email error" },
              password: { hasError: true, message: "password error" }
            };

            const errorAlertMessage = {
              visible: true,
              alertType: "danger"
            };

            wrapper = shallow(
              <LoginForm setFormType = {handleMockFunction} handleButtonClick={handleMockFunction} hasErrors={error} alertMessage={errorAlertMessage} error_message = "" dismissAlert={handleMockFunction} />
            );
           
            expect(wrapper.find('Alert')).toHaveLength(1);
            expect(wrapper.find('Alert').prop('open')).toBeTruthy();
            expect(wrapper.find('Alert').prop('theme')).toEqual('danger');

            expect(wrapper.find('FormInput')).toHaveLength(2);
            expect(wrapper.find('FormInput').at(0).prop('invalid')).toBeTruthy();
            expect(wrapper.find('FormInput').at(1).prop('invalid')).toBeTruthy();
            expect(wrapper.find('Tooltip')).toHaveLength(2);
            expect(wrapper.find('Tooltip').at(0).prop('open')).toBeTruthy();
            expect(wrapper.find('Tooltip').at(1).prop('open')).toBeTruthy();
          });
        });

      });
    });
  
    describe("functions", () => {

      //test form change button click 


    });
});

