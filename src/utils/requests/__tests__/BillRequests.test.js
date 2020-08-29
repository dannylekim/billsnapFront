import {answerPendingBill, getBill, getDetailedBill} from "../BillRequests";

const { URL } = require("../../../config");

const MISSING_AUTH_HEADER = "missing Authorization header";

function createMockAnswerBill(token, billId, accepted) {
  fetch = jest.fn((url, options) => {
    if (options.method !== "POST") {
      throw new Error("wrong method");
    }

    if (options.headers.Authorization !== `Bearer ${token}`) {
      throw new Error(MISSING_AUTH_HEADER);
    }

    if (url !== `${URL}/invitations/${billId}`) {
      throw new Error("wrong url");
    }

    if (options.body !== JSON.stringify({ answer: accepted })) {
      throw new Error("wrong body");
    }

    return new Promise((resolve) => {
      resolve({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: {} }),
      });
    });
  });
}

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
          throw new Error(MISSING_AUTH_HEADER);
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
        expect(() => expect(e.message).toBe(MISSING_AUTH_HEADER));
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

  describe("answerBill", () => {
    afterEach(() => {
      localStorage.clear();
    });

    beforeEach(() => {
      localStorage.setItem("billSnap_token", token);
    });

    const billId = 1;
    const accepted = true;
    const token = "token";

    it("Should return an json object with the right method", async () => {
      createMockAnswerBill(token, billId, accepted);

      const res = await answerPendingBill(accepted, billId);

      expect(res.data).toEqual({});
    });

    it("Should return null with the right method", async () => {
      createMockAnswerBill(token, billId, false);

      const res = await answerPendingBill(false, billId);

      expect(res).toEqual(null);
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
        await answerPendingBill(accepted, billId);
      } catch (e) {
        expect(() => expect(e.data).toEqual({}));
      }
    });
  });

  describe("getDetailedBill", () => {
    afterEach(() => {
      localStorage.clear();
    });

    beforeEach(() => {
      localStorage.setItem("billSnap_token", token);
    });

    const billId = 1;
    const token = "token";

    it("Should return an json object with the right method", async () => {
      fetch = jest.fn((url, options) => {
        if (options.method !== "GET") {
          throw new Error("wrong method");
        }

        if (options.headers.Authorization !== `Bearer ${token}`) {
          throw new Error(MISSING_AUTH_HEADER);
        }

        if (url !== `${URL}/bills/${billId}`) {
          throw new Error("wrong url");
        }

        return new Promise((resolve) => {
          resolve({
            ok: true,
            json: jest.fn().mockResolvedValue({ data: {} }),
          });
        });
      });

      const res = await getDetailedBill(billId);

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
        await getDetailedBill(billId);
      } catch (e) {
        expect(() => expect(e.data).toEqual({}));
      }
    });
  });
});
