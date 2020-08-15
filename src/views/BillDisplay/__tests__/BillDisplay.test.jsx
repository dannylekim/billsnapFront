import React from "react";
import BillDisplay from "../BillDisplay";
import {shallow} from "enzyme";
import {FaBus, FaCar, FaQuestion, FaShoppingBag, FaShoppingCart, FaUtensils,} from "react-icons/fa";

jest.mock("../../../utils/requests/BillRequests", () => {
  return {
    getBill: jest.fn().mockResolvedValue(["bill1", "bill2"]),
  };
});

describe("BillDisplay", () => {
  let wrapper, instance;
  let mockFetch = jest.fn(),
      mockSetActiveBill = jest.fn();

  const responsible = {
    id: 1,
    email: "someEmail@email.com",
    firstName: "Bob",
    middleName: null,
    lastName: "Smith",
    gender: null,
    phoneNumber: null,
    birthDate: null,
    location: null,
  };

  const mockBills = [
    {
      id: 1,
      name: "BILL MOCK 1",
      status: "OPEN",
      category: "string",
      created: "05-03-2018 15:25:10 -0400",
      balance: 12.0,
      responsible,
    },
    {
      id: 2,
      name: "BILL MOCK 2",
      status: "OPEN",
      category: "string",
      created: "06-04-2018 15:25:10 -0400",
      balance: 15.0,
      responsible,
    },
  ];

  beforeEach(() => {
    wrapper = shallow(
      <BillDisplay
        setActiveBill={mockSetActiveBill}
        bills={mockBills}
        fetchBills={mockFetch}
        isBillLoading={false}
        searchInput={""}
      />
    );

    instance = wrapper.instance();
  });
  afterEach(() => {
    mockFetch.mockRestore();
    mockSetActiveBill.mockRestore();
  });

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("BillDisplay should match snap shot when loading", () => {
        matches(
          <BillDisplay
            bills={[]}
            fetchBills={mockFetch}
            isBillLoading={true}
            setActiveBill={mockSetActiveBill}
            searchInput={""}
          />
        );
      });

      it("BillDisplay should match snap shot when done loading + bills", () => {
        matches(
          <BillDisplay
            bills={mockBills}
            fetchBills={mockFetch}
            isBillLoading={false}
            setActiveBill={mockSetActiveBill}
            searchInput={""}
          />
        );
      });

      it("BillDisplay should match snap shot when done loading + no bills", () => {
        matches(
          <BillDisplay
            bills={[]}
            fetchBills={mockFetch}
            isBillLoading={false}
            setActiveBill={mockSetActiveBill}
            searchInput={""}
          />
        );
      });
    });
  });
});
