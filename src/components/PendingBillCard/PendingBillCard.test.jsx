import React from "react";
import {PendingBillCard} from "./PendingBillCard";

describe("PendingBillCard", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("PendingBillCard should match snap shot", () => {
        matches(<PendingBillCard />);
      });
    });
  });
});