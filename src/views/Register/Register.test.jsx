import React from "react";
import ReactDOM from "react-dom";
import RegisterPage, { RegisterContainer } from "./Register.jsx";
import { TitleLogo } from "../../components/TitleLogo";

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
      // some reason enzyme seems to broken in v3
      test.skip("RegisterPage should contain RegisterContainer and TitleLogo component", () => {
        expect(wrapper.find("RegisterContainer")).to.have.lengthOf(1);
        expect(wrapper.find("TitleLogo").to.have.lengthOf(1));
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
