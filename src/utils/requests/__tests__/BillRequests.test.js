import {createBill, getBill} from "../BillRequests";

const { URL } = require("../../../config");
const { BILLS, BILLSNAP_TOKEN } = require("../../../constants/constants");

const createBillsParam = {
  name: "Bill Test #1",
  category: "category",
  company: "company",
  items: [
    {
      name: "test item",
      cost: 10,
    },
  ],
  accountsList: ["testAccount@email.com"],
  tipAmount: 10,
  taxes: [
    {
      name: "tax1",
      percentage: 10,
    },
  ],
};

const token = "token";

describe("BillRequests", () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe("getBill", () => {
    it("Should return an json object with the right method", async () => {
      fetch = jest.fn((url, options) => {
        if (options.method !== "GET") {
          throw new Error("wrong method");
        }

        return new Promise((resolve) => {
          resolve({
            json: jest.fn().mockResolvedValue({ data: {} }),
          });
        });
      });

      const res = await getBill();

      expect(res.data).toEqual({});
    });

    it("Should return an json object if calling with the right url", async () => {
      fetch = jest.fn((url) => {
        if (url !== `${URL}/bills`) {
          throw new Error("wrong url");
        }

        return new Promise((resolve) => {
          resolve({
            json: jest.fn().mockResolvedValue({ data: {} }),
          });
        });
      });

      const res = await getBill();

      expect(res.data).toEqual({});
    });

    it("Should return a json object if called with Authorization header with bearer token", async () => {
      localStorage.setItem(BILLSNAP_TOKEN, token);

      fetch = jest.fn((url, options) => {
        if (options.headers.Authorization !== `Bearer ${token}`) {
          throw new Error("missing Authorization header");
        }

        return new Promise((resolve) => {
          resolve({
            json: jest.fn().mockResolvedValue({ data: {} }),
          });
        });
      });
      try {
        await getBill();
      } catch (e) {
        expect(() => expect(e.message).toBe("missing Authorization header"));
      }
    });

    it("Should throw an error if api throws an error", async () => {
      fetch = jest.fn(() => {
        throw new Error("error");
      });

      try {
        await getBill();
      } catch (e) {
        expect(() => expect(e.message).toBe("error"));
      }
    });
  });

  describe("createBill", () => {
    it("Should return an json object with the right method, body, url and header", async () => {
      localStorage.setItem(BILLSNAP_TOKEN, token);

      fetch = jest.fn((url, options) => {
        if (options.method !== "POST") {
          throw new Error("wrong method");
        }

        if (options.body !== JSON.stringify(createBillsParam)) {
          throw new Error("Wrong body");
        }

        if (url !== `${URL}/${BILLS}`) {
          throw new Error("wrong url");
        }

        if (options.headers.Authorization !== `Bearer ${token}`) {
          throw new Error("missing Authorization header");
        }

        return new Promise((resolve) => {
          resolve({
            json: jest.fn().mockResolvedValue({ data: {} }),
          });
        });
      });

      const res = await createBill(createBillsParam);

      expect(res.data).toEqual({});
    });

    it("Should throw an error if api throws an error", async () => {
      fetch = jest.fn(() => {
        throw new Error("error");
      });

      try {
        await createBill(createBillsParam);
      } catch (e) {
        expect(() => expect(e.message).toBe("error"));
      }
    });
  });
});
