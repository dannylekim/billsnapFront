import React from "react";
import ReactDOM from "react-dom";
import {TitleContent} from "../TitleContent.jsx";

describe("TitleContent", () => {
  describe("render", () => {
    it("renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<TitleContent />, div);
    });
  });
});

describe("TitleContent", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("TitleContent should match snap shot", () => {
        matches(<TitleContent />);
      });
    });

    describe("components", () => {});
  });

  describe("functions", () => {});
});
