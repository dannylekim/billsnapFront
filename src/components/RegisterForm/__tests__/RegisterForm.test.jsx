import React from 'react';
import { RegisterForm } from '../RegisterForm.jsx';
import { shallow } from "enzyme";
import {matches} from "../../../setupTests";

describe('RegisterForm', () => {
    let wrapper;
    let handleMockFunction;
  
    beforeEach(() => {
      handleMockFunction = jest.fn();
      wrapper = shallow(
        <RegisterForm handleButtonClick={handleMockFunction} validInvalidByName={handleMockFunction}/>
      );
    });
  
    afterEach(() => {
      handleMockFunction.mockRestore();
    });
  
    describe("render", () => {
      describe("snapshots 📸", () => {
        it("Register should match snap shot", () => {
          matches(<RegisterForm handleButtonClick={handleMockFunction} validInvalidByName={handleMockFunction}/>);
        });
      });
  
      describe("components", () => {});
    });
  
    describe("functions", () => {});
});