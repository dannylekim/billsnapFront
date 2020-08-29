import React from "react";
import Dashboard from "../Dashboard";

jest.mock("../../BillDisplay", () => "BillDisplay");
jest.mock(
  "../../../components/PendingBillsContainer",
  () => "PendingBillsContainer"
);
jest.mock("../../../components/BillSummary", () => "BillSummary");
jest.mock("../../../components/SearchBar", () => "SearchBar");


const testActiveBill = {
  id: 38,
  name: "YEBOI",
  creator: {
    firstName: "string",
    middleName: "string",
    lastName: "string",
    gender: "MALE",
    phoneNumber: "string",
    birthDate: "2020-07-25",
    location: {
      name: "string",
      description: "string",
      address: "string",
      city: "string",
      state: "string",
      country: "string",
      postalCode: "string",
    },
    id: 23,
    email: "test@Password123.com",
  },
  responsible: {
    firstName: "string",
    middleName: "string",
    lastName: "string",
    gender: "MALE",
    phoneNumber: "string",
    birthDate: "2020-07-25",
    location: {
      name: "string",
      description: "string",
      address: "string",
      city: "string",
      state: "string",
      country: "string",
      postalCode: "string",
    },
    id: 23,
    email: "test@Password123.com",
  },
  status: "OPEN",
  company: "string",
  category: "string",
  created: "09-12-2019 00:46:00 -0500",
  updated: "25-07-2020 00:50:04 -0400",
  items: [
    { id: 89, name: "BIGGEST LAD", cost: "2000.00" },
    { id: 52, name: "Bigger String", cost: "300.00" },
    { id: 51, name: "ENLARGEN", cost: "1500.00" },
  ],
  informationPerAccount: [
    {
      account: {
        firstName: "string",
        middleName: "string",
        lastName: "string",
        gender: "MALE",
        phoneNumber: "string",
        birthDate: "2020-07-25",
        location: {
          name: "string",
          description: "string",
          address: "string",
          city: "string",
          state: "string",
          country: "string",
          postalCode: "string",
        },
        id: 23,
        email: "test@Password123.com",
      },
      items: [
        { itemId: 89, name: "BIGGEST LAD", cost: 2000, percentage: 100 },
        { itemId: 52, name: "Bigger String", cost: 300, percentage: 60 },
        { itemId: 51, name: "ENLARGEN", cost: 1500, percentage: 90 },
      ],
      subTotal: "3530.00",
      tip: "13.95",
      taxes: "529.50",
      amountPaid: null,
      amountRemaining: "4073.45",
      invitationStatus: "ACCEPTED",
      paidStatus: null,
      total: "4073.45",
    },
    {
      account: {
        firstName: "string",
        middleName: "string",
        lastName: "string",
        gender: "MALE",
        phoneNumber: "string",
        birthDate: "2020-07-25",
        location: {
          name: "string",
          description: "string",
          address: "string",
          city: "string",
          state: "string",
          country: "string",
          postalCode: "string",
        },
        id: 53,
        email: "many@bills.com",
      },
      items: [],
      subTotal: "0.00",
      tip: "0.00",
      taxes: "0.00",
      amountPaid: "0.00",
      amountRemaining: "0.00",
      invitationStatus: "ACCEPTED",
      paidStatus: null,
      total: "0.00",
    },
    {
      account: {
        firstName: "string",
        middleName: null,
        lastName: "string",
        gender: null,
        phoneNumber: null,
        birthDate: null,
        location: null,
        id: 24,
        email: "test2@Password123.com",
      },
      items: [
        { itemId: 52, name: "Bigger String", cost: 300, percentage: 40 },
        { itemId: 51, name: "ENLARGEN", cost: 1500, percentage: 10 },
      ],
      subTotal: "270.00",
      tip: "1.05",
      taxes: "40.50",
      amountPaid: null,
      amountRemaining: "311.55",
      invitationStatus: "ACCEPTED",
      paidStatus: null,
      total: "311.55",
    },
  ],
  splitBy: "ITEM",
  totalTip: "15.00",
  balance: "4385.00",
  taxes: [{ name: "string", percentage: 15, id: 12 }],
};

describe("Dashboard", () => {
  describe("render", () => {
    beforeEach(() => {
      localStorage.setItem("billSnap_token", "token");
    });

    afterEach(() => {
      localStorage.clear();
    });

    describe("snapshots 📸", () => {
      it("Dashboard should match snap shot", () => {
        matches(<Dashboard history={{ push: jest.fn() }} hasUser={true} />);
      });

      it("Dashboard should match snap shot if no user logged", () => {
        matches(<Dashboard history={{ push: jest.fn() }} />);
      });

      it("Dashboard should match snap shot on notifications tab", () => {
        const wrapper = shallow(<Dashboard history={{ push: jest.fn() }} hasUser={true} />);

        wrapper.setState((prev) => ({
          ...prev,
          currentActiveTab: "owedToYou",
        }));

        matches(wrapper);
      });

      it("Dashboard should match snap shot on nothing", () => {
        const wrapper = shallow(<Dashboard history={{ push: jest.fn() }} hasUser={true}/>);

        wrapper.setState((prev) => ({
          ...prev,
          currentActiveTab: "",
        }));

        matches(wrapper);
      });

      it("Dashboard should match snapshot with a large bill card", () => {
        const wrapper = shallow(<Dashboard history={{ push: jest.fn() }} hasUser={true} activeBill={testActiveBill}/>);
        matches(wrapper)
      })
    });
  });
});
