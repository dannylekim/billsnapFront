import PayBill from "./PayBill";
import React from "react";

describe("PayBill", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("PayBill should match snap shot", () => {
        matches(<PayBill />);
      });
    });
  });
});
