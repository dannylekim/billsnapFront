import React from "react";
import LargeBillCard from "./LargeBillCard";

jest.mock("../../../components/ItemSplitContainer", () => "ItemSplitContainer");

const sampleBill = {
  id: 100,
  name: "long bill",
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
  company: "LONG",
  category: "shopping",
  created: "28-08-2020 16:13:46 -0400",
  updated: "28-08-2020 16:13:46 -0400",
  items: [
    {
      id: 116,
      name: "item 6",
      cost: "6.00",
    },
    {
      id: 121,
      name: "item 3",
      cost: "3.00",
    },
    {
      id: 118,
      name: "item 2",
      cost: "2.00",
    },
    {
      id: 120,
      name: "item 4",
      cost: "4.00",
    },
    {
      id: 117,
      name: "item 5",
      cost: "5.00",
    },
    {
      id: 119,
      name: "item 1",
      cost: "1.00",
    },
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
        id: 53,
        email: "many@bills.com",
      },
      items: [],
      subTotal: "0.00",
      tip: "0.00",
      taxes: "0.00",
      amountPaid: "0.00",
      amountRemaining: "0.00",
      invitationStatus: "PENDING",
      paidStatus: null,
      total: "0.00",
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
        id: 23,
        email: "test@Password123.com",
      },
      items: [
        {
          itemId: 116,
          name: "item 6",
          cost: 6,
          percentage: 100,
        },
        {
          itemId: 121,
          name: "item 3",
          cost: 3,
          percentage: 100,
        },
        {
          itemId: 118,
          name: "item 2",
          cost: 2,
          percentage: 100,
        },
        {
          itemId: 120,
          name: "item 4",
          cost: 4,
          percentage: 100,
        },
        {
          itemId: 117,
          name: "item 5",
          cost: 5,
          percentage: 100,
        },
        {
          itemId: 119,
          name: "item 1",
          cost: 1,
          percentage: 100,
        },
      ],
      subTotal: "21.00",
      tip: "69.00",
      taxes: "54.68",
      amountPaid: "0.00",
      amountRemaining: "144.68",
      invitationStatus: "ACCEPTED",
      paidStatus: null,
      total: "144.68",
    },
  ],
  splitBy: "ITEM",
  totalTip: "69.00",
  balance: "144.68",
  taxes: [
    {
      name: "tax 3",
      percentage: 30,
      id: 20,
    },
    {
      name: "tax 4",
      percentage: 40,
      id: 21,
    },
    {
      name: "tax 2",
      percentage: 20,
      id: 19,
    },
    {
      name: "tax 5",
      percentage: 50,
      id: 22,
    },
    {
      name: "tax 1",
      percentage: 10,
      id: 23,
    },
  ],
};

describe("LargeBillCard", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("SmallBillCard should match snap shot", () => {
        matches(<LargeBillCard bill={sampleBill} />);
      });
    });
  });
});
