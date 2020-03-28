import {mockGetBill} from "../__mocks__/BillRequests";

describe("BillRequests", () => {
   
    describe("getBill", () => {

        it("Should contain no bills", async () => {
            const res = await mockGetBill("bad");
            expect(res).toEqual([]);
        });

        it("Should contain bills", async () => {
            const res = await mockGetBill("good");
            expect(res.length).toBeGreaterThan(0);
        });

        it("Should throw an unauthorized error", async () => {
            const res = await mockGetBill("invalidToken") 
            expect(typeof res).toEqual("object");
        });
    });
});