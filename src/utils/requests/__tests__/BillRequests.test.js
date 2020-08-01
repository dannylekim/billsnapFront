import {getBills, getDetailedBill} from "../BillRequests";

const {URL} = require("../../../config");

describe("BillRequests", () => {
    describe("getBills", () => {

        afterEach(() => {
            localStorage.clear();
            global.fetch.mockClear();
        });

        it("Should return an json object with the right method", async () => {

            fetch = jest.fn((url, options) => {

                if (options.method !== "GET") {
                    throw new Error("wrong method")
                }

                return new Promise((resolve) => {
                    resolve({
                        json: jest.fn().mockResolvedValue({data: {}})
                    })
                });
            });

            const res = await getBills();

            expect(res.data).toEqual({});
        });


        it("Should return an json object if calling with the right url", async () => {

            fetch = jest.fn((url) => {

                if (url !== `${URL}/bills`) {
                    throw new Error("wrong url")
                }

                return new Promise((resolve) => {
                    resolve({
                        json: jest.fn().mockResolvedValue({data: {}})
                    })
                });
            });

            const res = await getBills();

            expect(res.data).toEqual({});
        });

        it("Should return a json object if called with Authorization header with bearer token", async () => {

            const token = "token";
            localStorage.setItem("billSnap_token", token);

            fetch = jest.fn((url, options) => {

                if (options.headers.Authorization !== `Bearer ${token}`) {
                    throw new Error("missing Authorization header")
                }

                return new Promise((resolve) => {
                    resolve({
                        json: jest.fn().mockResolvedValue({data: {}})
                    })
                });
            });

            const res = await getBills();

            expect(res.data).toEqual({});
        });


        it("Should throw an error if api throws an error", async () => {

            fetch = jest.fn(() => {
                throw new Error("error")
            });

            expect(getBills()).rejects.toEqual(new Error("error"));
        });
    });

    describe("getDetailedBill", () => {

        afterEach(() => {
            localStorage.clear()
            global.fetch.mockClear();
        });

        it("Should return a json object given correct request options", async () => {
            const billId = "12345";
            const token = "token";
            localStorage.setItem("billSnap_token", token);
            const options = {
                method: "GET",
                headers: {"Authorization": `Bearer ${token}`}
            };
            const responseData = {"id": 123};

            jest.spyOn(global, 'fetch').mockImplementation((url, options) => {
                if (options.method !== "GET") {
                    throw new Error("wrong method")
                }
                if (url !== `${URL}/bills/${billId}`) {
                    throw new Error("wrong url")
                }
                if (options.headers.Authorization !== `Bearer ${token}`) {
                    throw new Error("missing Authorization header")
                }

                return new Promise((resolve) => {
                    resolve({
                        json: jest.fn().mockResolvedValue({data: responseData})
                    })
                });
            });

            const res = await getDetailedBill(billId);

            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(`${URL}/bills/${billId}`, options);
            expect(res.data).toEqual(responseData);
        });

        it("Should throw an error if API throws an error", async () => {
            const billId = "12345";

            jest.spyOn(global, 'fetch').mockImplementation(() => {
                throw new Error("error");
            });

            expect(getDetailedBill(billId)).rejects.toEqual(new Error("error"));
        });
    });
});
