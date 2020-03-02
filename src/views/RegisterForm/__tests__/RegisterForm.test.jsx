import React from 'react';
import { RegisterForm, defaultError } from '../RegisterForm.jsx';
import { shallow } from "enzyme";

describe('RegisterForm', () => {
    let wrapper;
    let handleMockFunction;

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
      wrapper = shallow(
        <RegisterForm setFormType = {handleMockFunction} handleButtonClick={handleMockFunction} validInvalidByName={handleMockFunction} conditions={conditions} alertNotification={defaultError}/>
      );
    });
  
    afterEach(() => {
      handleMockFunction.mockRestore();
    });
  
    describe("render", () => {
      describe("snapshots 📸", () => {
        it("Register should match snap shot", () => {
          const firstNameToolTip = document.createElement('div');
          const lastNameToolTip = document.createElement('div');
          const emailToolTip = document.createElement('div');
          const passwordToolTip = document.createElement('div');
          const verifyPasswordToolTip = document.createElement('div');
          
          firstNameToolTip.setAttribute("id", "firstName");
          document.body.appendChild(firstNameToolTip);

          lastNameToolTip.setAttribute("id", "lastName");
          document.body.appendChild(lastNameToolTip);

          emailToolTip.setAttribute("id", "email");
          document.body.appendChild(emailToolTip);

          passwordToolTip.setAttribute("id", "password");
          document.body.appendChild(passwordToolTip);

          verifyPasswordToolTip.setAttribute("id", "confirmPassword");
          document.body.appendChild(verifyPasswordToolTip);

          matches(<RegisterForm setFormType = {handleMockFunction} handleButtonClick={handleMockFunction} validInvalidByName={handleMockFunction} conditions={conditions}  alertNotification={defaultError}/>);//matches come from setuptest
        });
      });
  
      describe("components", () => {});
    });
  
    describe("functions", () => {});
});