import React from 'react';
import LoginFormContainer, {LoginForm , defaultErrors,defaultAlertMessage } from '../LoginForm.jsx';
import { shallow, mount } from "enzyme";

describe('LoginForm', () => {
    let wrapper;
    let handleMockFunction,mockOnChange,mockDismissAlert,mockHandleResponse,mockHandleButtonClick, mockToggleFormType;
    let setState,useStateSpy;

    beforeEach(() => {
      setState = jest.fn();
      useStateSpy = jest.spyOn(React, 'useState').mockImplementation((init) => [init, setState]);
      mockToggleFormType =  jest.fn();
      handleMockFunction = jest.fn();
      mockDismissAlert = jest.fn();
      mockOnChange = jest.fn().mockImplementation(() => useStateSpy);
      mockHandleResponse = jest.fn();
      mockHandleButtonClick = jest.fn().mockImplementation(() => mockHandleResponse);

      wrapper = shallow(
        <LoginForm onChange = {mockOnChange} setFormType = {mockToggleFormType} handleButtonClick={mockHandleButtonClick} hasErrors={defaultErrors} alertMessage={defaultAlertMessage} error_message = "" dismissAlert={mockDismissAlert}/>
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
          <LoginForm onChange = {mockOnChange} setFormType = {mockToggleFormType} handleButtonClick={handleMockFunction} hasErrors={defaultErrors} alertMessage={defaultAlertMessage} error_message = "" dismissAlert={handleMockFunction}/>);
        });

        it("LoginContainer should match snap shot", () => {
 
          matches(
          <LoginFormContainer />);
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
              <LoginForm onChange = {mockOnChange} setFormType = {mockToggleFormType} handleButtonClick={mockHandleButtonClick} hasErrors={error} alertMessage={errorAlertMessage} error_message = "" dismissAlert={mockDismissAlert} />
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
      it("dismissAlert should close alert message", () => {
        const error = {
          email: { hasError: true, message: "email error" },
          password: { hasError: true, message: "password error" }
        };

        const errorAlertMessage = {
          visible: true,
          alertType: "danger"
        };

        wrapper = mount(
          <LoginForm onChange = {mockOnChange} setFormType = {mockToggleFormType} handleButtonClick={mockHandleButtonClick} hasErrors={error} alertMessage={errorAlertMessage} error_message = "" dismissAlert={mockDismissAlert} />
          );
        
        wrapper.find("button.close").simulate("click");
        expect(mockDismissAlert).toBeCalledTimes(1);
      });

    it("handleResponse is called", () => {
      wrapper = mount(
        <LoginForm onChange = {mockOnChange} setFormType = {mockToggleFormType} handleButtonClick={mockHandleButtonClick} hasErrors={defaultErrors} alertMessage={defaultAlertMessage} error_message = "" dismissAlert={mockDismissAlert} />
      );
      wrapper.find("button.btn.btn-pill").simulate("click");
      expect(mockHandleButtonClick).toBeCalledTimes(1);
      expect(mockHandleButtonClick()).toBe(mockHandleResponse);
    });

    it("onChange is called when form input is changed", () => {
      wrapper = mount(
        <LoginForm onChange = {mockOnChange} setFormType = {mockToggleFormType} handleButtonClick={mockHandleButtonClick} hasErrors={defaultErrors} alertMessage={defaultAlertMessage} error_message = "" dismissAlert={mockDismissAlert} />
      );
      wrapper.find("FormGroup").at(0).props().onChange();
      expect(mockOnChange).toBeCalledTimes(1);
      
    });

    it("click formToggle", () => {
      wrapper.find(".form__toggle").simulate("click");
      expect(mockToggleFormType).toBeCalledTimes(1);
    });
  });
});

