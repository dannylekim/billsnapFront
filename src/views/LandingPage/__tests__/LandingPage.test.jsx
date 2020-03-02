import React from "react";
import LandingPage from "../LandingPage.jsx";

describe("LandingPage", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("LandingPage should match snap shot", () => {
        const firstNameToolTip = document.createElement('div');
        const lastNameToolTip = document.createElement('div');
        const emailToolTip = document.createElement('div');
        const passwordToolTip = document.createElement('div');
        const verifyPasswordToolTip = document.createElement('div');
        
        firstNameToolTip.setAttribute("id", "firstName");
        document.body.appendChild(firstNameToolTip);

        lastNameToolTip.setAttribute("id", "lastName");
        document.body.appendChild(lastNameToolTip);

        emailToolTip.setAttribute("id", "email");
        document.body.appendChild(emailToolTip);

        passwordToolTip.setAttribute("id", "password");
        document.body.appendChild(passwordToolTip);

        verifyPasswordToolTip.setAttribute("id", "confirmPassword");
        document.body.appendChild(verifyPasswordToolTip);

        matches(<LandingPage />);
      });
    });
  });
});

