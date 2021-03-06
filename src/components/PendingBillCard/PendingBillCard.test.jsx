import React from "react";
import {PendingBillCard} from "./PendingBillCard";

describe("PendingBillCard", () => {
  describe("render", () => {
    const bill = {
      id: 0,
      name: "Test Bill",
      responsible: {
        firstName: "Test User",
      },
      status: "IN_PROGRESS",
      category: "string",
      created: "2020-08-14T15:28:56.580Z",
      balance: 100,
      amountOwed: 50,
    };

    describe("snapshots 📸", () => {
      it("PendingBillCard should match snap shot", () => {
        matches(
          <PendingBillCard
            bill={bill}
            activeBillId={bill.id}
            acceptBillInvitationHandler={jest.fn()}
            declineBillInvitationHandler={jest.fn()}
            filterDateHandler={jest.fn()}
            getBillIconHandler={jest.fn()}
          />
        );
      });

      it("PendingBillCard should match snap shot", () => {
        matches(
          <PendingBillCard
            bill={bill}
            activeBillId={999}
            acceptBillInvitationHandler={jest.fn()}
            declineBillInvitationHandler={jest.fn()}
            filterDateHandler={jest.fn()}
            getBillIconHandler={jest.fn()}
          />
        );
      });
    });
  });
});
