import React from "react";
import LandingPage from "./LandingPage.jsx";

describe("LandingPage", () => {


  describe("render", () => {
    describe("snapshots 📸", () => {
      it("LandingPage should match snap shot", () => {
        matches(<LandingPage/>);
      });
    });

  });
});

