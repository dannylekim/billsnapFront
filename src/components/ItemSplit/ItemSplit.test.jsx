import React from "react";
import ItemSplit from "./ItemSplit";

const testItemInformation = {
  name: "Bigger String",
  cost: "300.00",
  accounts: [
    { status: "ACCEPTED", firstName: "string", percentage: 60 },
    { status: "ACCEPTED", firstName: "string", percentage: 40 },
  ],
};

describe("ItemSplit", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("should match snapshot", () => {
        matches(<ItemSplit itemInformation={testItemInformation} />);
      });
    });
  });
});
