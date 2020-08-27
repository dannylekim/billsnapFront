import BillIcon from "./BillIcon";
import React from "react";

describe("BillIcon", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("BillIcon should match food snap shot", () => {
        matches(<BillIcon category="food" />);
      });
      it("BillIcon should match transport snap shot", () => {
        matches(<BillIcon category="transport" />);
      });
      it("BillIcon should match public-transport snap shot", () => {
        matches(<BillIcon category="public-transport" />);
      });
      it("BillIcon should match grocery snap shot", () => {
        matches(<BillIcon category="grocery" />);
      });
      it("BillIcon should match shopping snap shot", () => {
        matches(<BillIcon category="shopping" />);
      });
      it("BillIcon should match ? snap shot", () => {
        matches(<BillIcon category="?" />);
      });
    });
  });
});
