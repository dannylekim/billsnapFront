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
  {
    id: 50,
    name: "KFC",
    status: "OPEN",
    category: "public-transport",
    created: "02-07-2020 15:25:10 -0400",
    balance: 151.0,
    responsible: {
      firstName: 'Hello',
      lastName: 'Motto'
    }
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
            activeBillId={fakeBills[0].id}
          />
        );
      });

      it("SmallBillCard should match snap shot if owner exists", () => {
        matches(
          <SmallBillCard
            bill={fakeBills[2]}
            filterDateTime={jest.fn()}
            billIcons={jest.fn()}
            activeBillId={fakeBills[0].id}
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
          activeBillId={fakeBills[0].id}
        />
      );
      expect(wrapper.find(".bill-active")).toHaveLength(0);
    });

    it("should find an active bill", () => {
      wrapper = shallow(
        <SmallBillCard
          bill={fakeBills[0]}
          filterDateTime={jest.fn()}
          billIcons={jest.fn()}
          activeBillId={fakeBills[0].id}
        />
      );
      expect(wrapper.find(".bill-active")).toHaveLength(1);
    });
  });
});
