import {getBill} from "../BillRequests";

const {URL} = require("../../../config");

describe("BillRequests", () => {
    describe("getBill", () => {

        afterEach(() => {
            localStorage.clear();
        });

        it("Should return an json object with the right method", async () => {

            fetch = jest.fn((url, options) => {

                if (options.method !== "GET") {
                    throw new Error("wrong method")
                }

                return new Promise((resolve) => {
                    resolve({
                        json: () => Promise.resolve({data: {}})
                    })
                });
            });

            const res = await getBill();

            expect(res.data).toEqual({});
        });


        it("Should return an json object if calling with the right url", async () => {

            fetch = jest.fn((url) => {

                if (url !== `${URL}/bills`) {
                    throw new Error("wrong url")
                }

                return new Promise((resolve) => {
                    resolve({
                        json: () => Promise.resolve({data: {}})
                    })
                });
            });

            const res = await getBill();

            expect(res.data).toEqual({});
        });

        it("Should return an json object if called with Authorization header with bearer token", async () => {

            const token = "token";

            localStorage.setItem("token", token);

            fetch = jest.fn((url, options) => {

                if (options.headers.Authorization !== `Bearer ${token}`) {
                    throw new Error("missing Authorization header")
                }

                return new Promise((resolve) => {
                    resolve({
                        json: () => Promise.resolve({data: {}})
                    })
                });
            });

            const res = await getBill();

            expect(res.data).toEqual({});
        });


        it("Should throw an error if api throws an error", async () => {

            fetch = jest.fn(() => {
                throw new Error("error")
            });

            await expect(() => getBill().toThrowError());
        });


    });
});
