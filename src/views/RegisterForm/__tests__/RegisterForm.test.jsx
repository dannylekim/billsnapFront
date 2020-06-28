import React from 'react';
import RegisterFormContainer, { RegisterForm, defaultError } from '../RegisterForm.jsx';
import registerFormInputs from "../registerFormConstants.json";
import {createRegisterFormElements} from "../../../constants/FormElements";
import { shallow } from "enzyme";

describe('RegisterForm', () => {

      let wrapper;
      let wrapper2;
      let handleMockFunction;
      let mockToggleFormType;
      let mockOnChange;
      let mockButtonClick;

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
        mockButtonClick = jest.fn();
        wrapper = shallow(
          <RegisterForm onChange = {mockOnChange} setFormType = {mockToggleFormType} handleButtonClick={mockButtonClick} validInvalidByName={handleMockFunction} conditions={conditions} alertNotification={defaultError}/>
        );
        wrapper2 = shallow(<RegisterFormContainer setFormType = {mockToggleFormType}/>);
      });

      afterEach(() => {
        handleMockFunction.mockRestore();
      });

      describe("render", () => {
        describe("snapshots 📸", () => {
          it("Register should match snap shot", () => {
            createRegisterFormElements();

            matches(<RegisterForm onChange = {mockOnChange} setFormType = {mockToggleFormType} handleButtonClick={mockButtonClick} validInvalidByName={handleMockFunction} conditions={conditions} alertNotification={defaultError}/>);
          });

          it("RegisterFormContainer should match snap shot", () => {
            matches(<RegisterFormContainer />)
          })
        });
  
      describe("components", () => {
        describe("FormInput props should match", () => {
        
          it("should match firstName", () => {
            expect(wrapper.find("FormInput").at(0).prop("name")).toEqual(registerFormInputs[0].name);
          });

          it("should match lastName", () => {
            expect(wrapper.find("FormInput").at(1).prop("name")).toEqual(registerFormInputs[1].name);
          });

          it("should match email", () => {
            expect(wrapper.find("FormInput").at(2).prop("name")).toEqual(registerFormInputs[2].name);
          });

          it("should match password", () => {
            expect(wrapper.find("FormInput").at(3).prop("name")).toEqual(registerFormInputs[3].name);
          });

          it("should match confirmPassword", () => {
            expect(wrapper.find("FormInput").at(4).prop("name")).toEqual(registerFormInputs[4].name);
          });

        });
    })
    });
  
    describe("functions", () => {

      it("onChange is called when form input is changed", () => {
        wrapper.find("FormGroup").at(0).props().onChange();
        expect(mockOnChange).toBeCalledTimes(1);
      });
  

      it("click formToggle", () => {
        wrapper.find(".form__toggle").simulate("click");
        wrapper2.props().setFormType();
        expect(mockToggleFormType).toBeCalledTimes(2);
      });

      it("click submit", () => {
        const submitButton = wrapper.find("Button").at(0);
        expect(submitButton.text()).toBe("<Button />");
        expect(submitButton.prop("name")).toBe("submit");
        expect(submitButton.prop("size")).toBe("md");
        submitButton.simulate("click");
       
        expect(mockButtonClick).toBeCalledTimes(1);

      });

    });
});