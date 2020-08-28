import React from "react";
import BillSummary from "../BillSummary";

describe("BillSummary", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("BillSummary should match snap shot with empty bill", () => {
        matches(
          <BillSummary
            activeBill={{}}
          />
        );
      });

      it("BillSummary should match snap shot with empty active bill and many bills count", () => {
        matches(
          <BillSummary
            activeBill={{}}
            amountToOwe={123.00}
            billCount={100}
          />
        );
      });

      it("BillSummary should match snap shot with empty active bill and many bills count", () => {
        const mockBill = {
            id: 1,
            responsible: {
                firstName: 'Bob',
                lastName: 'Ross',
            },
            status: 'OPENED',
            balance: 20.20,
        }
        matches(
          <BillSummary
            activeBill={mockBill}
            amountToOwe={123.00}
            billCount={100}
          />
        );
      });
    });
  });

  describe("component ", () => {
  });
});
