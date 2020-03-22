import { getBill } from "../BillRequests";

describe("BillRequests", () => {
    /** @description Note that these tokens may change. */ 
    const userWithBills = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYXNzd29yZEBQYXNzd29yZDEyMy5jb20iLCJleHAiOjExNTgzMzY4NTYyLCJyb2xlcyI6WyJST0xFX1VTRVIiXX0.v1ghtMgVNzrBBWBl2nrVOzCrNy6v3F5avY83CCfHbaIZ3SzvXkPi9MBwG6ZNmWDxEeSmozp3oCTCzp5kljg2rg";
    const userWithNoBills = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3aWxsLnNtaXRoQGhvdG1haWwuY29tIiwiZXhwIjoxMTU4NDQ3NTEzMCwicm9sZXMiOlsiUk9MRV9VU0VSIl19.-WYZdPKTwJxs3R22Y_iBK0Mfao_xBMSMfglC0FTz0onK47Mw9mm_Y2xH1Z67G7oq7Mf47xTmXcDWqiRtM4CjFg";

    describe("getBill", () => {

        it("Should contain no bills", async () => {
            const res = await getBill(userWithNoBills);
            expect(res).toEqual([]);
        });

        it("Should contain bills", async () => {
            const res = await getBill(userWithBills);
            expect(res.length).toBeGreaterThan(0);
        });

        it("Should throw an unauthorized error", async () => {
            const res = await getBill("invalidToken");
            expect(res.status).toEqual("UNAUTHORIZED");
            expect(res.message).toEqual("Access is unauthorized!");
        });
    });
});