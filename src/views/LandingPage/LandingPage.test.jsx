import React from "react";
import LandingPage from "./LandingPage.jsx";
import {matches} from "../../setupTests";

describe("LandingPage", () => {


  describe("render", () => {
    describe("snapshots 📸", () => {
      it("LandingPage should match snap shot", () => {
        matches(<LandingPage/>);
      });
    });

  });
});

