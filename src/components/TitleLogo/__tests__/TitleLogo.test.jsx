import React from "react";
import ReactDOM from "react-dom";
import { TitleLogo } from "../TitleLogo.jsx";

describe("TitleLogo", () => {
  describe("render", () => {
    it("renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<TitleLogo />, div);
    });
  });
});
