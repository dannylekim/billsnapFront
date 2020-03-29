import React from 'react';
import RegisterFormContainer, { RegisterForm, defaultError } from '../RegisterForm.jsx';
import {createRegisterFormElements} from "../../../constants/FormElements";
import { shallow } from "enzyme";

describe('RegisterForm', () => {
    let wrapper;
    let handleMockFunction;
    let mockToggleFormType;
    let mockOnChange;

    const conditions = [
      {
        name:"confirmPassword",
        condition: false,
        toolTipInfo: {
          open: false,
          errorMessage: ""
        }
      },
      {
        name:"password",
        condition: false,
        toolTipInfo: {
          open: false,
          errorMessage: ""
        }
      },
      {
        name:"firstName",
        condition: false,
        toolTipInfo: {
          open: false,
          errorMessage: ""
        }
      },
      {
        name:"lastName",
        condition: false,
        toolTipInfo: {
          open: false,
          errorMessage: ""
        }
      },
      {
        name:"email",
        condition: false,
        toolTipInfo: {
          open: false,
          errorMessage: ""
        }
      }
    ];

    beforeEach(() => {
      handleMockFunction = jest.fn();
      mockToggleFormType =  jest.fn();
      mockOnChange = jest.fn();
      wrapper = shallow(
        <RegisterForm onChange = {mockOnChange} setFormType = {mockToggleFormType} handleButtonClick={handleMockFunction} validInvalidByName={handleMockFunction} conditions={conditions} alertNotification={defaultError}/>
      );
    });
  
    afterEach(() => {
      handleMockFunction.mockRestore();
    });
  
    describe("render", () => {
      describe("snapshots 📸", () => {
        it("Register should match snap shot", () => {
          createRegisterFormElements();

          matches(<RegisterForm onChange = {mockOnChange} setFormType = {mockToggleFormType} handleButtonClick={handleMockFunction} validInvalidByName={handleMockFunction} conditions={conditions} alertNotification={defaultError}/>);
        });

        it("RegisterFormContainer should match snap shot", () => {
          matches(<RegisterFormContainer />)
        })
      });
  
      describe("components", () => {});
    });
  
    describe("functions", () => {

      it("onChange is called when form input is changed", () => {
        wrapper.find("FormGroup").at(0).props().onChange();
        expect(mockOnChange).toBeCalledTimes(1);
      });
  

      it("click formToggle", () => {
        wrapper.find(".form__toggle").simulate("click");
        expect(mockToggleFormType).toBeCalledTimes(1);
      });

    });
});