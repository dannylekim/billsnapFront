import React from 'react';
import { LoginForm } from '../LoginForm.jsx';
import { shallow } from "enzyme";
import {matches} from "../../../setupTests";

describe('LoginForm', () => {
    let wrapper;
    let handleMockFunction;
  
    beforeEach(() => {
      handleMockFunction = jest.fn();
      wrapper = shallow(
        <LoginForm handleButtonClick={handleMockFunction} />
      );
    });
  
    afterEach(() => {
      handleMockFunction.mockRestore();
    });
  
    describe("render", () => {
      describe("snapshots 📸", () => {
        it("Login should match snap shot", () => {
          matches(<LoginForm handleButtonClick={handleMockFunction}/>);
        });
      });
  
      describe("components", () => {});
    });
  
    describe("functions", () => {});
});