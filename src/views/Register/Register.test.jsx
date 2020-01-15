import React from "react";
import ReactDOM from "react-dom";
import RegisterPage, { RegisterContainer } from "./Register.jsx";
import { shallow } from "enzyme";

describe("RegisterPage", () => {
  let wrapper;
  let handleMockFunction;

  beforeEach(() => {
    handleMockFunction = jest.fn();
    wrapper = shallow(<RegisterPage />);
  });

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("RegisterPage should match snap shot", () => {
        matches(<RegisterPage />);
      });
    });

    describe("components", () => {
      test("RegisterPage should contain RegisterContainer and TitleLogo component", () => {
        expect(wrapper.find("RegisterContainer")).toHaveLength(1);
      });
    });
  });
});

describe("RegisterContainer", () => {
  let wrapper;
  let handleMockFunction;

  beforeEach(() => {
    handleMockFunction = jest.fn();
    wrapper = shallow(
      <RegisterContainer handleButtonClick={handleMockFunction} />
    );
  });

  afterEach(() => {
    handleMockFunction.mockRestore();
  });

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("RegisterContainer should match snap shot", () => {
        matches(<RegisterContainer />);
      });
    });

    describe("components", () => {});
  });

  describe("functions", () => {});
});
