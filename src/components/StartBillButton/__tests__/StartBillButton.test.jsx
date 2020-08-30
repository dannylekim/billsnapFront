import React from "react";
import ReactDOM from "react-dom";
import {StartBillButton} from "../StartBillButton.jsx";

describe("StartBillButton", () => {
  describe("render", () => {
    it("renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<StartBillButton/>, div);
    });

    describe("snapshots 📸", () => {
      it("StartBillButton should match snap shot", () => {
        matches(<StartBillButton/>);
      });
    });
  });
});
