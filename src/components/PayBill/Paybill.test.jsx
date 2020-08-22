import PayBill from "./PayBill";
import React from "react";

describe("PayBill", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("PayBill should match snap shot", () => {
        matches(<PayBill />);
      });

      it("PayBill should match snap shot with billName and amountRemaining", () => {
        matches(<PayBill billName={"test"} amountRemainingToPay={100} />);
      });
    });
  });
});
