import React from 'react';
import { LoginForm, defaultErrors } from '../LoginForm.jsx';
import { shallow } from "enzyme";

describe('LoginForm', () => {
    let wrapper;
    let handleMockFunction;

    beforeEach(() => {
      handleMockFunction = jest.fn();
      wrapper = shallow(
        <LoginForm handleButtonClick={handleMockFunction} hasErrors={defaultErrors} />
      );
    });
  
    afterEach(() => {
      handleMockFunction.mockRestore();
    });
  
    describe("render", () => {
      describe("snapshots 📸", () => {
        it("Login should match snap shot", () => {
          matches(<LoginForm handleButtonClick={handleMockFunction} hasErrors={defaultErrors}/>);
        });
      });

      describe("components", () => {});
    });
  
    describe("functions", () => {});
});
