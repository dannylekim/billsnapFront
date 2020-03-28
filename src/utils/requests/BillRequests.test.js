import {mockGetBill} from "./__mocks__/BillRequests";

describe("BillRequests", () => {
    const getBill = jest.fn(token => mockGetBill(token));

    describe("getBill", () => {

        it("Should contain no bills", async () => {
            const res = await getBill("bad");
            expect(res).toEqual([]);
        });

        it("Should contain bills", async () => {
            const res = await getBill("good");
            expect(res.length).toBeGreaterThan(0);
        });

        it("Should throw an unauthorized error", async () => {
            const res = await getBill("invalidToken") 
            expect(typeof res).toEqual("object");
        });
    });
});