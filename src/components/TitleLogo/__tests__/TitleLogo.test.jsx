import React from "react";
import ReactDOM from "react-dom";
import { TitleLogo } from "../TitleLogo.jsx";
import {matches} from "../../../setupTests";

describe("TitleLogo", () => {
  describe("render", () => {
    it("renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<TitleLogo />, div);
    });
  });
});

describe('TitleLogo', () => {

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("TitleLogo should match snap shot", () => {
        matches(<TitleLogo />);
      });
    });

    describe("components", () => {});
  });

  describe("functions", () => {});
});
