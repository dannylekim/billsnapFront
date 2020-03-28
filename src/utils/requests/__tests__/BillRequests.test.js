import mockGetBill from "../__mocks__/BillRequests";
import {getBill} from "../BillRequests"; 
describe("BillRequests", () => {
    const callGetBill = jest.fn(token => getBill(token));

    describe("getBill", () => {

        it("Should contain no bills", async () => {
            const res = await mockGetBill("userHasNoBills");
            expect(res).toEqual([]);
        });

        it("Should contain bills", async () => {
            const res = await mockGetBill("userHasBills");
            expect(res.length).toBeGreaterThan(0);
        });

        it("Should return an object", async () => {
            const res = await callGetBill("aToken") 
            const mockRes =  await mockGetBill("aToken");
            expect(typeof res).toEqual("object");
            expect(typeof res).toEqual(typeof mockRes);
        });

        it("Should throw an unauthorized error", async () => {
            const res = await callGetBill("invalidToken");
            const mockRes =  await mockGetBill("invalidToken");
            expect(res.status).toEqual(mockRes.status);
            expect(res.message).toEqual(mockRes.message);
        });
    });
});