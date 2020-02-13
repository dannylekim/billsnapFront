import React from "react";
import ReactDOM from "react-dom";
import LandingPage, { RegisterLoginContainer } from "./LandingPage.jsx";
import { shallow } from "enzyme";

describe("LandingPage", () => {
  let wrapper;
  let handleMockFunction;

  beforeEach(() => {
    handleMockFunction = jest.fn();
    wrapper = shallow(<LandingPage />);
  });

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("LandingPage should match snap shot", () => {
        matches(<LandingPage/>);
      });
    });

    describe("components", () => {
      test("LandingPage should contain RegisterLoginContainer component", () => {
        expect(wrapper.find("RegisterLoginContainer")).toHaveLength(1);
      });
    });
  });
});

describe("RegisterLoginContainer", () => {
  let wrapper;
  let handleMockFunction;

  beforeEach(() => {
    handleMockFunction = jest.fn();
    wrapper = shallow(
      <RegisterLoginContainer handleButtonClick={handleMockFunction} />
    );
  });

  afterEach(() => {
    handleMockFunction.mockRestore();
  });

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("RegisterLoginContainer should match snap shot", () => {
        matches(<RegisterLoginContainer formType = {"register"} />);
      });
    });

    describe("components", () => {});
  });

  describe("functions", () => {});
});
