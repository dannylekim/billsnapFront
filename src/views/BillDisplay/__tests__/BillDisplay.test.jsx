import React from "react";
import BillDisplay from "../BillDisplay.jsx";
import { shallow } from "enzyme";

jest.mock("../../../utils/requests/BillRequests", () => {
  return {
    getBill: jest.fn().mockResolvedValue(["bill1", "bill2"]),
  };
});

describe("BillDisplay", () => {
  let wrapper, instance;
  let mockFetch;

  beforeEach(() => {
    mockFetch = jest.fn();

    wrapper = shallow(
      <BillDisplay bills={[]} fetchBills={mockFetch} isBillLoading={true} />
    );

    instance = wrapper.instance();
  });
  afterEach(() => {
    mockFetch.mockRestore();
  });

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("BillDisplay should match snap shot when loading", () => {
        matches(
          <BillDisplay bills={[]} fetchBills={mockFetch} isBillLoading={true} />
        );
      });

      it("BillDisplay should match snap shot when done loading + no bills", () => {
        matches(
          <BillDisplay bills={[]} fetchBills={mockFetch} isBillLoading={false} />
        );
      });

      it("BillDisplay should match snap shot when done loading + bills", () => {
        const mockBills = [
          {
            id: 1,
            name: "BILL MOCK 1",
            status: "OPEN",
            category: "string",
            balance: 12.0,
          },
          {
            id: 2,
            name: "BILL MOCK 2",
            status: "OPEN",
            category: "string",
            balance: 15.0,
          },
        ];
        matches(
          <BillDisplay bills={mockBills} fetchBills={mockFetch} isBillLoading={false} />
        );
      });
    });
  });

  describe("functions", () => {
    it("fetchBill should be called 1 time", () => {
      expect(mockFetch).toBeCalledTimes(1);
    });

    it("billStatusColor should return appropriate colors", () => {
      expect(BillDisplay.billStatusColor("OPEN")).toBe("success");
      expect(BillDisplay.billStatusColor("RESOLVED")).toBe("primary");
      expect(BillDisplay.billStatusColor("IN_PROGRESS")).toBe("warning");
      expect(BillDisplay.billStatusColor("BlahBlah")).toBe("muted");

    });
  });
});
