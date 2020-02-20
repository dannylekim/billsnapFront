import React from 'react';
import { RegisterForm } from '../RegisterForm.jsx';
import { shallow } from "enzyme";

describe('RegisterForm', () => {
    let wrapper;
    let handleMockFunction;
  
    beforeEach(() => {
      handleMockFunction = jest.fn();
      wrapper = shallow(
        <RegisterForm handleButtonClick={handleMockFunction} validInvalidByName={handleMockFunction} conditions={[{condition: false}]}/>
      );
    });
  
    afterEach(() => {
      handleMockFunction.mockRestore();
    });
  
    describe("render", () => {
      describe("snapshots 📸", () => {
        it("Register should match snap shot", () => {
          matches(<RegisterForm handleButtonClick={handleMockFunction} validInvalidByName={handleMockFunction} conditions={[{condition: false}]}/>);//matches come from setuptest
        });
      });
  
      describe("components", () => {});
    });
  
    describe("functions", () => {});
});