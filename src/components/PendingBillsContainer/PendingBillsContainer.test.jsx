import React from "react";
import PendingBillsContainer from "./PendingBillsContainer";

const pendingBills = [
  {
    id: 0,
    name: "string 1",
    responsible: {
      firstName: "string",
      middleName: "string",
      lastName: "string",
      id: 0,
      email: "string",
    },
    status: "IN_PROGRESS",
    category: "string",
    created: "2020-08-26T00:31:21.674Z",
    balance: 100,
    amountOwed: 50,
  },
  {
    id: 1,
    name: "string 2",
    responsible: {
      firstName: "string",
      middleName: "string",
      lastName: "string",
      id: 1,
      email: "string",
    },
    status: "IN_PROGRESS",
    category: "string",
    created: "2020-08-23T00:31:21.674Z",
    balance: 200,
    amountOwed: 150,
  },
];

describe("PendingBillsContainer", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("PendingBillsContainer should match snap shot without bills", () => {
        matches(<PendingBillsContainer pendingBills={[]} />);
      });

      it("PendingBillsContainer should match snap shot with bills", () => {
        matches(<PendingBillsContainer pendingBills={pendingBills} activeBillId={0}/>);
      });
    });
  });

  describe("functions", () => {
    describe("componentDidMount", () => {
      it("should fetch pending bills on mount", async () => {
        const mockFetchPendingBills = jest.fn();
        shallow(
          <PendingBillsContainer fetchPendingBills={mockFetchPendingBills} pendingBills={[]}/>
        );

        expect(mockFetchPendingBills).toHaveBeenCalled();
      });
    });

    describe("handleAnswerBill", () => {
      const mockUpdatePendingBill = jest.fn();
      shallow(
        <PendingBillsContainer updatePendingBill={mockUpdatePendingBill} pendingBills={[]}/>
      ).instance().handleAnswerBill(true, 0);

      expect(mockUpdatePendingBill).toHaveBeenCalledWith(true, 0);
    });
  });
});
