import React from "react";
import ItemSplitContainer from "./ItemSplitContainer";

const testBill = {
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

const expectedResult = {
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
          <ItemSplitContainer selectedItemId={selectedItemId} bill={testBill} />
        );
      });

      it("should match open snapshot", () => {
        const wrapper = shallow(
          <ItemSplitContainer selectedItemId={selectedItemId} bill={testBill} />
        );

        wrapper.setState((prev) => ({
          ...prev,
          isOpen: true,
        }));

        matches(wrapper);
      });
    });

    describe("component", () => {
      it("should return expectedResult in state", () => {
        const wrapper = shallow(
          <ItemSplitContainer selectedItemId={selectedItemId} bill={testBill} />
        );

        const itemInformation = wrapper.state().itemInformation;
        expect(itemInformation).toEqual(expectedResult);
      });
    });
  });
});
