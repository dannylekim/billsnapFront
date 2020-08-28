import React from "react";
import SmallBillCard from "../SmallBillCard.jsx";

const fakeBills = [
  {
    id: 48,
    name: "Mcdonald",
    status: "OPEN",
    category: "food",
    created: "28-07-2020 14:25:10 -0400",
    balance: 253.89,
    responsible: {
      firstName: 'Hello',
      lastName: 'Motto'
    }
  }
];

describe("SmallBillCard", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("SmallBillCard should match snap shot", () => {
        matches(
          <SmallBillCard
            bill={fakeBills[0]}
            activeBillId={999}
          />
        );
      });

      it("SmallBillCard should match snap shot if owner exists", () => {
        matches(
          <SmallBillCard
            bill={fakeBills[0]}
            activeBillId={fakeBills[0].id}
          />
        );
      });
    });
  });
});
