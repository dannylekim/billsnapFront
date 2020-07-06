import React from "react";
import LandingPage from "../LandingPage.jsx";
import {createRegisterFormElements} from "../../../constants/FormElements";

describe("LandingPage", () => {
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
  });

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("LandingPage should match snap shot register", () => {
        createRegisterFormElements();
        matches(<LandingPage formType={'register'} toggleFormType={mockFn} />);
      });
      it("LandingPage should match snap shot login", () => {
        createRegisterFormElements();
        matches(<LandingPage formType={'login'} toggleFormType={mockFn} />);
      });
    });
  });
});

