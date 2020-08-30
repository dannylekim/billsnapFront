import React from "react";
import AccountStatusIcon from "./AccountStatusIcon";

describe("AccountStatusIcon", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("AccountStatusIcon must match snapshot for ACCEPTED", () => {
        matches(
          <AccountStatusIcon sizeMultiplier={1} status="ACCEPTED" name="TEST" />
        );
      });
      it("AccountStatusIcon must match snapshot for PENDING", () => {
        matches(
          <AccountStatusIcon sizeMultiplier={2} status="PENDING" name="TEST" />
        );
      });
      it("AccountStatusIcon must match snapshot for DECLINED", () => {
        matches(
          <AccountStatusIcon sizeMultiplier={3} status="DECLINED" name="TEST" />
        );
      });

      it("AccountStatusIcon must match snapshot for invalid status", () => {
        matches(
          <AccountStatusIcon sizeMultiplier={3} status="INVALID" name="TEST" />
        );
      });
    });
  });
});
