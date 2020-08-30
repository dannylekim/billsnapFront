import React from "react";
import ItemSplitContainer from "./ItemSplitContainer";

const testInformation = {
  name: "Bigger String",
  cost: "300.00",
  accounts: [
    { status: "ACCEPTED", firstName: "string", percentage: 60 },
    { status: "ACCEPTED", firstName: "string", percentage: 40 },
  ],
};

describe("ItemSplitContainer", () => {
  describe("render", () => {
    const selectedItemId = 52;

    describe("snapshot 📸", () => {
      it("should match closed snapshot", () => {
        matches(
          <ItemSplitContainer
            selectedItemId={selectedItemId}
            itemInformation={testInformation}
            setActiveItemId={jest.fn}
          />
        );
      });

      it("should match open snapshot", () => {
        const wrapper = shallow(
          <ItemSplitContainer
            selectedItemId={selectedItemId}
            itemInformation={testInformation}
            setActiveItemId={jest.fn}
          />
        );

        wrapper.setState((prev) => ({
          ...prev,
          isOpen: true,
        }));

        matches(wrapper);
      });
    });
  });
});
