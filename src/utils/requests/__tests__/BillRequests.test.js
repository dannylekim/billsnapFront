import {getBill, startBill} from "../BillRequests";

const { URL } = require("../../../config");

describe("BillRequests", () => {
  describe("getBill", () => {
    afterEach(() => {
      localStorage.clear();
    });

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
      const token = "token";

      localStorage.setItem("billSnap_token", token);

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
});

describe("startBill", () => {
  afterEach(() => {
    localStorage.clear();
  });

  const billId = 1;

  it("Should return an json object with the right method", async () => {
    const token = "token";
    localStorage.setItem("billSnap_token", token);

    fetch = jest.fn((url, options) => {
      if (options.method !== "POST") {
        throw new Error("wrong method");
      }

      if (options.headers.Authorization !== `Bearer ${token}`) {
        throw new Error("missing Authorization header");
      }

      if (url !== `${URL}/bills/start`) {
        throw new Error("wrong url");
      }

      if (options.body !== JSON.stringify({ id: billId })) {
        throw new Error("wrong body");
      }

      return new Promise((resolve) => {
        resolve({
          ok: true,
          json: jest.fn().mockResolvedValue({ data: {} }),
        });
      });
    });

    const res = await startBill(billId);

    expect(res.data).toEqual({});
  });

  it("Should throw same json object if error", async () => {
    fetch = jest.fn(() => {
      return new Promise((resolve) => {
        resolve({
          ok: false,
          json: jest.fn().mockResolvedValue({ data: {} }),
        });
      });
    });

    try {
      await startBill(billId);
    } catch (e) {
      expect(() => expect(e.data).toEqual({}));
    }
  });
});
