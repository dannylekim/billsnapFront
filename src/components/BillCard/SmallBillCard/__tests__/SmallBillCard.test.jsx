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
  },
  {
    id: 49,
    name: "STM",
    status: "OPEN",
    category: "public-transport",
    created: "02-07-2020 15:25:10 -0400",
    balance: 151.0,
  },
];

describe("SmallBillCard", () => {
  let wrapper;
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("SmallBillCard should match snap shot", () => {
        matches(
          <SmallBillCard
            bill={fakeBills[0]}
            filterDateTime={jest.fn()}
            billIcons={jest.fn()}
            activeBill={fakeBills[0]}
          />
        );
      });
    });
  });

  describe("component ", () => {
    it("should not find an active bill", () => {
      wrapper = shallow(
        <SmallBillCard
          bill={fakeBills[1]}
          filterDateTime={jest.fn()}
          billIcons={jest.fn()}
          activeBill={fakeBills[0]}
        />
      );
      expect(wrapper.find("#non__active__bill")).toHaveLength(1);
    });

    it("should find an active bill", () => {
      wrapper = shallow(
        <SmallBillCard
          bill={fakeBills[0]}
          filterDateTime={jest.fn()}
          billIcons={jest.fn()}
          activeBill={fakeBills[0]}
        />
      );
      expect(wrapper.find("#active__bill")).toHaveLength(1);
    });
  });
});
