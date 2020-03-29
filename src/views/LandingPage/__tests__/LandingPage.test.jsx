import React from "react";
import LandingPage from "../LandingPage.jsx";
import {createRegisterFormElements} from "../../../constants/FormElements";

describe("LandingPage", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("LandingPage should match snap shot", () => {
        createRegisterFormElements();
        matches(<LandingPage />);
      });
    });
  });
});

